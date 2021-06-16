import createAuth0Client from '@auth0/auth0-spa-js';

function createAuth0() {
    let auth0Instance = null;

    async function createClient() {
        try {
            auth0Instance = await createAuth0Client({
                domain: 'eddiestenant.auth0.com',
                client_id: 'M2pLxEZWHiyslZkQo2SINaHbm110lSeK',
                useRefreshTokens: true,
                redirect_uri: `${window.location.origin}/auth/callback`,
                audience: 'https://test-api-eddy.com',
                cacheLocation: 'localstorage',
            });
            return auth0Instance;
        } catch(ex) {
            console.log(ex);
        }
    }

    if (!auth0Instance) {
        return createClient();
    }

    return auth0Instance;
}

const loginUser = async () => {
    try {
        const auth0 = await createAuth0();
        await auth0.loginWithRedirect({
            audience: 'https://test-api-eddy.com',
            redirect_uri: `${window.location.origin}/auth/callback`,
        });
    } catch (ex) {
        console.log(ex);
    } 
};

const logoutUser = async () => {
    try {
        const auth0 = await createAuth0();
        await auth0.logout({
            returnTo: window.location.origin,
        });
    } catch (ex) {
        console.log(ex);
    }
};

const handleCallback = async () => {
    try {
        const auth0 = await createAuth0();

        await auth0.handleRedirectCallback();

        const user = await auth0.getUser();

        const isUserLoggedIn = await auth0.isAuthenticated();

        console.group('Auth Response');
        console.log('User Info', user);
        console.log('Authenticated', isUserLoggedIn);
        console.groupEnd();

    } catch(ex) {
        console.log(ex);
    }
};

const getAccessToken = async () => {
    try {
        const auth0 = await createAuth0();
        const token = await auth0.getTokenSilently({
            audience: 'https://test-api-eddy.com',
        });
        console.log('accesstoken', token);
    } catch (ex) {
        console.log(ex);
    }
};

const loginPopUp = async () => {
    try {
        const auth0 = await createAuth0();
        const response = await auth0.loginWithPopup();
        console.log('response >>> ', response);
        const user = await auth0.getUser();
        console.log('loginPopUp >>>> handleCallback >>>', user);
    } catch (ex) {
        console.log(ex);
    }
};

const getAuthInfo = async () => {
    const auth0 = await createAuth0();
    const isAuthenticated = await auth0.isAuthenticated();
    const userInfo = await auth0.getUser() || {};

    return {
        userInfo,
        isAuthenticated,
    };
}

export {
    getAuthInfo,
    createAuth0,
    loginUser,
    logoutUser,
    handleCallback,
    loginPopUp,
    getAccessToken,
};
