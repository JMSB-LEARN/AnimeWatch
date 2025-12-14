export interface Episode {
    title: string;
    aired: string;
    score: number;
}
export interface Anime {
    id: number;
    title: string;
    image_url: string;
    score: number;
    status?: string;
    synopsis?: string;
    episodes?: Episode[];
}

export function convert_to_anime(anime: { id: number; title: string; image_url: string; score: number; }): Anime {
    return {
        id: anime.id,
        title: anime.title,
        image_url: anime.image_url,
        score: anime.score,
    };
}