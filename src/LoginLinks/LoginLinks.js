import { Link } from "react-router-dom";

import { AuthContext } from '../Auth/auth0-context';

import {
    getAccessToken,
    // loginUser,
    // loginPopUp,
    logoutUser,
} from '../Auth/auth';

const LoginLinks = () => {
    return (
      <>
        <AuthContext.Consumer>
          {({
              userInfo,
              isAuthenticated,
              loginByAuth0PopUp,
              loginByRedirect,
          }) => (
              <div>
                  <div style={{ padding: 5 }}>
                    {isAuthenticated ? (
                      <Link to="" onClick={() => { logoutUser() } } >logout</Link>
                    ) : (
                      <>
                        <Link to="" onClick={() => { loginByRedirect() }}>Login with redirect</Link>
                        &nbsp;&nbsp;
                        <Link to="" onClick={() => { loginByAuth0PopUp() }}>Login PopUp</Link>
                      </>
                    )}
                  </div>
                  <div style={{ padding: 5 }}>
                    <button onClick={() => { getAccessToken(); }}>Get AccessToken</button>
                  </div>
                  {isAuthenticated && (
                    <>
                      <div style={{ padding: 5 }}>
                          hi { userInfo.nickname }, welcome back..
                      </div>
                      <div style={{ padding: 5 }}>
                          email { userInfo.email }
                      </div>
                      <div style={{ padding: 5 }}>
                        <Link to="/checkout">go to checkout</Link>
                      </div>
                    </>
                  )}
              </div>
          )}
        </AuthContext.Consumer>
      </>
    )
  };
  
  export default LoginLinks;
