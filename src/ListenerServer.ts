import * as WebSocket from 'ws';
import MusicApi from './api/MusicApi';
import Track from './models/Track';

interface ListenMessage {
	id: string;
	name: string;
	type: string;
}

export default class ListenerServer {

	private server: WebSocket.Server;
	private musicApi: MusicApi;

	constructor(musicApi: MusicApi) {
		this.musicApi = musicApi;
	}

	public start(cb: () => void) {
		this.server = new WebSocket.Server({ port: 8001, clientTracking: true }, cb);

		this.server.on('connection', socket => {
			console.log(`LISTENER CONNECTED: ${this.server.clients.size} connection(s)`);

			socket.on('message', data => this.onMessage(JSON.parse(data.toString())));
		});
	}

	private onMessage(message: ListenMessage) {
		switch (message.type) {
		case 'listen':
			this.sendListeningTrack(message);
			break;
		case 'stopped':
			this.broadcast(JSON.stringify({
				trackId: message.id,
				type: 'stopped',
				name: message.name,
			}));
			break;
		}
	}

	private async sendListeningTrack(message: ListenMessage) {
		let track: Track;

		try {
			track = await this.musicApi.getTrack(message.id);
		} catch (err) {
			console.log(err);
		}

		this.broadcast(JSON.stringify({
			track,
			name: message.name,
			type: 'listen',
		}));
	}

	private broadcast(message) {
		this.server.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	}
}
