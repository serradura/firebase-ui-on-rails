# Firebase UI on Rails

This project is the Ruby on Rails version of [Firebaseui-web demo](https://github.com/firebase/firebaseui-web/tree/master/examples/demo).

* Ruby version
```
>= 2.2.2
```

* Rails version
```
~> 5.0.0
```

* Configuration
```
  # Create a Firebase app
  https://firebase.google.com/docs/web/setup

  # Create a `.env` file and set up your firebase app configurations.
  cp sample.env .env
```

* Deployment instructions (Heroku)

  0.  [Create](https://firebase.google.com/docs/web/setup) a Firebase App

  1. Clone this repo and create a heroku app to it.
    1. `git clone`  `https://github.com/serradura/firebase-ui-on-rails`
    2. `cd firebase-ui-on-rails`
    3. `heroku create`

  2. Set all environment variables.

    `heroku config:set FIREBASE_API_KEY="YOURAPPAPIKEY" FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com" FIREBASE_DATABASE_URL="https://your-app.firebaseio.com" FIREBASE_STORAGE_BUCKET="your-app.appspot.com" FIREBASE_MESSAGING_SENDER_ID="9999999999"`

  3. Deploy to heroku:
  `git push heroku master`

  4. Open the application URL.

    You can see it using the command: `heroku info`
