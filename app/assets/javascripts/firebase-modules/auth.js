// TODO: Remove global variable, refactor with a module pattern.
if (!window.____firebaseuiAuthAuthUI____) {
  window.____firebaseuiAuthAuthUI____ = undefined;
}

$(document).on('turbolinks:load', function() {
  var helpers = WebApp.helpers;

  if ( helpers.isCurrentResource('pages#home') || helpers.isCurrentResource('sessions#new') ) {
    var WIDGET_PAGE = '/pages/auth_widget';

    /**
     * FirebaseUI initialization to be used in a Single Page application context.
     */
    // FirebaseUI config.
    var uiConfig = {
      'callbacks': {
        // Called when the user has been successfully signed in.
        'signInSuccess': function(user, credential, redirectUrl) {

          handleSignedInViaServer(user, credential);

          // Do not redirect.
          return false;
        }
      },
      // Opens IDP Providers sign-in flow in a popup.
      'signInFlow': 'popup',
      'signInOptions': [
        // TODO(developer): Remove the providers you don't need for your app.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: ['https://www.googleapis.com/auth/plus.login']
        },
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes :[
            'public_profile',
            'email'//,
            // 'user_likes',
            // 'user_friends'
          ]
        },
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      'tosUrl': 'https://www.google.com'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    if (!window.____firebaseuiAuthAuthUI____) {
      window.____firebaseuiAuthAuthUI____ = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var ui = window.____firebaseuiAuthAuthUI____;
    // Keep track of the currently signed in user.
    var currentUid = null;

    /**
     * Redirects to the FirebaseUI widget.
     */
    var signInWithRedirect = function() {
      window.location.assign(WIDGET_PAGE);
    };


    /**
     * Open a popup with the FirebaseUI widget.
     */
    var signInWithPopup = function() {
      window.open(WIDGET_PAGE, 'Sign In', 'width=985,height=735');
    };

    var handleSignedInViaServer = function(user, credential) {
      $.post("/users/authentication", {
        user: JSON.parse(JSON.stringify(user)),
        credential: JSON.parse(JSON.stringify(credential))
      },function(data) {
        if (data.auth) {
          handleSignedInUser(user);
        }
      });
    }

    /**
     * Displays the UI for a signed in user.
     */
    var handleSignedInUser = function(user) {
      if ( helpers.isCurrentResource('pages#home') ) {
        currentUid = user.uid;
        document.getElementById('user-signed-in').style.display = 'block';
        document.getElementById('user-signed-out').style.display = 'none';
        document.getElementById('name').textContent = user.displayName;
        document.getElementById('email').textContent = user.email;
        if (user.photoURL){
          document.getElementById('photo').src = user.photoURL;
          document.getElementById('photo').style.display = 'block';
        } else {
          document.getElementById('photo').style.display = 'none';
        }
      } else {
        // TODO: Turn the redirection path dynamic.
        // This will redirect after sign in on /users/sign_in resource.
        Turbolinks.visit("/secure_pages/dashboard");
      }
    };

    // Devise Sign Out handler.
    var handleSignedOutViaServer = function(successCallback) {
      $.ajax({
        method: "DELETE",
        url: "/users/sign_out",
        success: successCallback
      });
    }

    /**
     * Displays the UI for a signed out user.
     */
    var handleSignedOutUser = function() {
      document.getElementById('user-signed-in').style.display = 'none';
      document.getElementById('user-signed-out').style.display = 'block';
      ui.start('#firebaseui-container', uiConfig);
    };

    // Listen to change in auth state so it displays the correct UI for when
    // the user is signed in or not.
    firebase.auth().onAuthStateChanged(function(user) {
      // The observer is also triggered when the user's token has expired and is
      // automatically refreshed. In that case, the user hasn't changed so we should
      // not update the UI.
      if (user && user.uid == currentUid) {
        return;
      }
      document.getElementById('loading').style.display = 'none';
      document.getElementById('loaded').style.display = 'block';
      user ? handleSignedInUser(user) : handleSignedOutUser();
    });

    /**
     * Initializes the app.
     */
    var initApp = function() {
      document.getElementById('sign-in-with-redirect')
              .addEventListener('click', signInWithRedirect);

      document.getElementById('sign-in-with-popup')
              .addEventListener('click', signInWithPopup);

      document.getElementById('sign-out')
              .addEventListener('click', function() {
                handleSignedOutViaServer(function() {
                  firebase.auth().signOut();
                });
              });

      document.getElementById('delete-account')
              .addEventListener('click', function() {
                handleSignedOutViaServer(function() {
                  firebase.auth().currentUser.delete();
                });
              });
    };

    if ( helpers.isCurrentResource('pages#home') ) {
      initApp();
    }
  };
});
