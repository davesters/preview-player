import * as Express from 'express';
import * as SpotifyWebApi from 'spotify-web-api-node';

import SpotifyMusicApi from './api/SpotifyMusicApi';
import * as musicHandlers from './handlers/music';
import ListenerServer from './ListenerServer';
import MusicApi from './api/MusicApi';

let musicApi: MusicApi;

if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
	const spotifyApi = this.spotify = new SpotifyWebApi({
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	});
	musicApi = new SpotifyMusicApi(spotifyApi);
}

if (!musicApi) {
	console.error('ERROR: No music API credentials found in the environment');
	process.exit(1);
}

const app = Express();
const listenerServer = new ListenerServer(musicApi);

app.get('/tracks/search', musicHandlers.searchTracks(musicApi));
app.get('/tracks/:id', musicHandlers.getTrack(musicApi));

app.listen(8000, '0.0.0.0', () => {
	console.log('API server listening on port 8000');
});

listenerServer.start(() => {
	console.log('Listener socket server listening on port 8001');
});
