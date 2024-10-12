export interface Artwork {
  id: string;
  title: string;
  artist: string;
  date: string;
  imageUrl: string;
  culture?: string;
  medium?: string;
  dimensions?: string;
  source: "Harvard Art Museums" | "Rijksmuseum" | "Metropolitan Museum of Art";
  moreInfoUrl: string;
}

export interface SearchResult {
  artworks: Artwork[];
  totalResults: number;
}
