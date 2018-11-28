import * as Express from 'express';

import MusicApi from '../api/MusicApi';

export function searchTracks(musicApi: MusicApi) {
	return async (request: Express.Request, response: Express.Response) => {
		if (!request.query.q) {
			response.statusCode = 400;
			return response.json({
				error: 'Search terms expected',
			});
		}

		try {
			const tracks = await musicApi.searchTracks(request.query.q);
			response.json(tracks);
		} catch (err) {
			console.log(err);
			response.statusCode = 500;
			response.end(err.message);
		}
	};
}

export function getTrack(musicApi: MusicApi) {
	return async (request: Express.Request, response: Express.Response) => {
		try {
			const track = await musicApi.getTrack(request.params.id);
			response.json(track);
		} catch (err) {
			console.log(err);
			response.statusCode = 500;
			response.json({
				error: err.message,
			});
		}
	};
}
