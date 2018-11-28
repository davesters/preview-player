import * as moment from 'moment';

import MusicApi from './MusicApi';
import SpotifyWebApi from 'spotify-web-api-node';
import Track from '../models/Track';

export default class SpotifyMusicApi implements MusicApi {

	private spotify: SpotifyWebApi;
	private expiresAt = moment();

	constructor(spotify: SpotifyWebApi) {
		this.spotify = spotify;
	}

	public async logIn(): Promise<void> {
		if (moment().isBefore(this.expiresAt)) {
			return Promise.resolve();
		}

		const response = await this.spotify.clientCredentialsGrant();
		this.spotify.setAccessToken(response.body['access_token']);
		this.expiresAt = moment().add(response.body['expires_in'], 'seconds');
	}

	public async searchTracks(query: string): Promise<Track[]> {
		await this.logIn();

		const response = await this.spotify.searchTracks(query);
		const tracks = response.body.tracks.items;

		return tracks
			.filter(track => track.preview_url)
			.map(this.mapTrack);
	}

	public async getTrack(id: string) {
		await this.logIn();

		const response = await this.spotify.getTrack(id);
		return this.mapTrack(response.body);
	}

	private mapTrack(track): Track {
		return {
			id: track.id,
			name: track.name,
			url: track.preview_url,
			duration: Math.round(track.duration_ms / 1000),
			artist: {
				id: track.artists[0].id,
				name: track.artists[0].name,
			},
			album: {
				id: track.album.id,
				name: track.album.name,
				image: track.album.images[0].url,
			},
		};
	}
}
