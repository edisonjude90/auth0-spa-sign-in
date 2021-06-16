import React from 'react';

const SiteLoader = ({ inProgress, handleAuth0PopUpFocus }) => {
    return (
        <>
            {(inProgress) && (
                <div id="overlay">
                    <div id="inprogress-msg">
                        <button
                            onClick={handleAuth0PopUpFocus}
                        >
                            Click to focus back on the auth0 page
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SiteLoader;