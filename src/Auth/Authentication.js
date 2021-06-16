import { useEffect, useState, useRef } from "react";
import { createAuth0 } from "./auth";
import { useHistory } from 'react-router-dom';
import { AuthContext } from './auth0-context';
import Auth0Loader from './Auth0Loader';

const useAuth0PopUp = () => {
    let popUpRef = useRef();

    const openPopup = (url) => {
        const width = 800;
        const height = 600;
    
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;
      
        popUpRef.current = window.open(
          url,
          "auth0:authorize:popup",
          `left=${left},top=${top},width=${width},height=${height},resizable,scrollbars=yes,status=1`
        );
    
        return popUpRef.current;
    };

    const handleAuth0PopUpFocus = () => {
        if (!popUpRef.current.closed) {
            popUpRef.current.focus();
        }
    };

    return {
        openPopup,
        handleAuth0PopUpFocus,
    };
}


const Authentication = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    const history = useHistory();

    let auth0Client = useRef();
    const { openPopup, handleAuth0PopUpFocus } = useAuth0PopUp();

    useEffect(() => {
        async function initAuth() {
            auth0Client.current = await createAuth0();

            if (window.location.href.indexOf('/auth/callback') > 0) {
                await auth0Client.current.handleRedirectCallback();

                const user = await auth0Client.current.getUser();
                const isAuthenticated = await auth0Client.current.isAuthenticated();

                setAuthenticated(isAuthenticated);
                setUserInfo(user);

                history.push('/');
            } else {
                const isAuthenticated = await auth0Client.current.isAuthenticated();

                if (!isAuthenticated) {
                    console.log('possible to cause a redirect login ?? ');
                    // await auth0Client.current.loginWithRedirect({
                    //     audience: 'https://test-api-eddy.com',
                    //     redirect_uri: `${window.location.origin}/auth/callback`,
                    // });
                } else {
                    const user = await auth0Client.current.getUser();

                    setAuthenticated(isAuthenticated);
                    setUserInfo(user);
                }
            }
        }

        initAuth();
    }, [history]);

    const loginByRedirect = async () => {
        try {
            await await auth0Client.current.loginWithRedirect({
                audience: 'https://test-api-eddy.com',
                redirect_uri: `${window.location.origin}/auth/callback`,
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    const loginByAuth0PopUp = async () => {
        try {
            setInProgress(true);
            const response = await auth0Client.current.loginWithPopup({}, {
                popup: openPopup(),
            });
            setInProgress(false);
            const isAuthenticated = await auth0Client.current.isAuthenticated();
            console.log('response >>> ', response);
            const user = await auth0Client.current.getUser();
            console.log('loginPopUp >>>> handleCallback >>>', user);

            setAuthenticated(isAuthenticated);
            setUserInfo(user);
        } catch (ex) {
            setInProgress(false);
            console.log(ex);
        }
    };

    return (
        <>
            <Auth0Loader
                inProgress={inProgress}
                handleAuth0PopUpFocus={handleAuth0PopUpFocus}
            />
            <AuthContext.Provider
                value={{
                    isAuthenticated,
                    userInfo,
                    loginByAuth0PopUp,
                    loginByRedirect,
                }}
            >
                { children }
            </AuthContext.Provider>
        </>
    );
};

export default Authentication;