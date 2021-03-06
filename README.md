# GH-Twitter Client

A React Native app to share code snippets from GitHub gists directly on Twitter.

## Install dependencies

```bash
npm install
```

## Initial Setup

The app sends `blobdata` to a Node.js backend (a Firebase function) where it is processed to create an image and tweet the same. Setup instructions can be found [here](https://github.com/FirePing32/GH-twitter-client-backend).

After setting up the Firebase function, set the function url in `App.js` -

```javascript
const SERVER = 'NODEJS_BACKEND_SERVER_URL'
```

A little hack to secure the Firebase function URL from unauthorized access is to set the [`TOKEN`](https://github.com/FirePing32/GH-twitter-client/blob/e19de98becde022985b2d6dd0a0dbb3c8ff82189/App.js#L27) variable in the `tweet_status()`
function to the alphanumeric string used while setting up the [Firebase function](https://github.com/FirePing32/GH-twitter-client-backend#setup). Using JWT is the most secure way of doing this, but this method does not require much code modification :)

## Build

The app can be built in 2 ways -

- `cd android && ./gradlew assembleRelease`
- `react-native bundle --platform android`

The `release` APK can be found in `/android/app/build/outputs/apk/release`.
