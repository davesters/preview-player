# Preview Music Player API

An API for searching music and getting URLs to previews for music tracks.

There is also a websocket server running so clients can get real-time updates of the music previews other users are currently listening too.

## Setup

Install node modules

```
yarn install
```

## Running the API

Run the API

```
npm start
```

Optionally, you can run it with a file watcher to auto re-compile and re-start the app with grunt

```
// If grunt is installed globally
grunt

// Or if you have npx
npx grunt
```

## Improvements

Some things that could use improvement

* Unit tests
* Proper error handling and logging
* API end-to-end tests
* Caching
* Some type of user session tracking to keep track of user's history.
* Ability to search artists or albums