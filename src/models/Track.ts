import Artist from './Artist';
import Album from './Album';

export default interface Track {
	id: string;
	name: string;
	url: string;
	duration: number;
	artist: Artist;
	album: Album;
}
