
export default interface MusicApi {
	searchTracks(query: string);
	getTrack(id: string);
}
