import Track from '../models/Track';

export default interface MusicApi {
	searchTracks(query: string): Promise<Track[]>;
	getTrack(id: string): Promise<Track>;
}
