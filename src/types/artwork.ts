export interface Artwork {
  id: string;
  title: string;
  artist: string;
  date: string;
  imageUrl: string | null;
  culture: string | null;
  medium: string | null;
  dimensions: string | null;
  source: "Harvard Art Museums" | "Rijksmuseum" | "Metropolitan Museum of Art";
  moreInfoUrl: string;
}

export interface SearchResult {
  artworks: Artwork[];
  totalResults: number;
}

export interface SearchFormProps {
  onSearch: (results: SearchResult) => void;
}

export interface ArtworkListProps {
  artworks: Artwork[];
  onArtworkSelect: (artwork: Artwork) => void;
}

export interface HarvardApiResponse {
  info: {
    totalRecords: number;
  };
  records: HarvardArtwork[];
}

export interface HarvardArtwork {
  objectnumber: string;
  title: string;
  people: { name: string }[] | null;
  dated: string;
  primaryimageurl: string | null;
  culture: string | null;
  medium: string | null;
  dimensions: string | null;
  division: string | null;
}

export interface RijksmuseumApiResponse {
  count: number;
  artObjects: RijksmuseumArtwork[];
}

export interface RijksmuseumArtwork {
  id: string;
  title: string;
  principalOrFirstMaker: string;
  longTitle: string;
  webImage: {
    url: string;
  } | null;
  productionPlaces: string[] | null;
  links: {
    web: string;
  };
}

export interface RijksmuseumDetailResponse {
  artObject: {
    id: string;
    title: string;
    principalOrFirstMaker: string;
    dating: {
      presentingDate: string;
    };
    webImage: {
      url: string;
    } | null;
    productionPlaces: string[] | null;
    physicalMedium: string | null;
    subTitle: string | null;
    links: {
      web: string;
    };
  };
}

export interface MetropolitanApiResponse {
  total: number;
  objectIDs: number[] | null;
}

export interface MetropolitanArtworkResponse {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  primaryImage: string;
  culture: string;
  medium: string;
  dimensions: string;
  objectURL: string;
}
