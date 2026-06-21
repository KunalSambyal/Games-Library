export interface RawGame {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    genres: { name: string }[];
}
