//import { createAuth0Client } from '@auth0/auth0-spa-js';
let auth0Client = null;
//const fetchAuthConfig = () => fetch("/auth_config.json");
// ..
const configureClient = async () => {
    // const response = await fetchAuthConfig();
    //const config = await response.json();
    auth0Client = await auth0.createAuth0Client({
        domain: "studybuddyit.eu.auth0.com",
        clientId: "VgaXnwKnIIQdnXxllOjDehbbxnH2d0dC"
    });
};
// ..
const login = async () => {
    await auth0Client.loginWithRedirect({
        authorizationParams: {
            redirect_uri: "https://test.studybuddy.it/"
        }
    });
};
window.onload = async () => {
    await configureClient();
};
//# sourceMappingURL=app.js.map