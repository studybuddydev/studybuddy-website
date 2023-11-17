let auth0Client = null;


//const fetchAuthConfig = () => fetch("/auth_config.json");

// ..

const configureClient = async () => {
   // const response = await fetchAuthConfig();
    //const config = await response.json();
  
    auth0Client = await auth0.createAuth0Client({
      domain: "dev-lk2eo802harq5vdb.eu.auth0.com",
      clientId: "sU23s5Io8hL6Rq84FXiD6OiHQRePcTas"
    });
  };

// ..

const login = async () => {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: "https://dev.studybuddy.it/"
      }
    });
  };


window.onload = async () => {
    await configureClient();
  }

