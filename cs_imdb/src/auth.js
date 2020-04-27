export default {
    //This function allows the log out button to clear out the token so that when the token is gone,
    //it represents a proper log-out of our system
    logout(callback) {
        delete localStorage.token;
        callback({authenticated: false});
        this.onLoginStatusChanged(false);
    },
    //This function allows certain items to be hidden and checks if the user is logged into the system
    loggedIn(localStorage) {
        console.log('loggedIn()::');
        //console.log(localStorage);
        //console.log(!!localStorage);
        return !!localStorage;
    },

    onLoginStatusChanged() {}
}
