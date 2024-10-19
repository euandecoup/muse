import axios from "axios";
import {
  Artwork,
  SearchResult,
  MetropolitanApiResponse,
  MetropolitanArtworkResponse,
} from "../types/artwork";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const searchMetropolitanArt = async (
  query: string
): Promise<SearchResult> => {
  try {
    const searchResponse = await axios.get<MetropolitanApiResponse>(
      `${BASE_URL}/search`,
      {
        params: {
          q: query,
          hasImages: true,
        },
      }
    );
    const objectIDs = searchResponse.data.objectIDs || [];
    const totalResults = searchResponse.data.total;
    const limitedObjectIDs = objectIDs.slice(0, 20);
    const artworkPromises = limitedObjectIDs.map((id) =>
      getMetropolitanArtworkDetails(id)
    );
    const artworks = await Promise.all(artworkPromises);
    const validArtworks = artworks.filter(
      (artwork): artwork is Artwork => artwork !== null
    );
    return {
      artworks: validArtworks,
      totalResults,
    };
  } catch (error) {
    console.error("Error fetching data from Metropolitan Museum API", error);
    return { artworks: [], totalResults: 0 };
  }
};

export const getMetropolitanArtworkDetails = async (
  objectID: number
): Promise<Artwork | null> => {
  try {
    const response = await axios.get<MetropolitanArtworkResponse>(
      `${BASE_URL}/objects/${objectID}`
    );
    const data = response.data;
    return {
      id: data.objectID.toString(),
      title: data.title,
      artist: data.artistDisplayName || "Unknown",
      date: data.objectDate || "Unknown",
      imageUrl: data.primaryImage || "Unknown",
      culture: data.culture || "Unknown",
      medium: data.medium || "",
      dimensions: data.dimensions || "",
      source: "Metropolitan Museum of Art",
      moreInfoUrl:
        data.objectURL ||
        `https://www.metmuseum.org/art/collection/search/${data.objectID}`,
    };
  } catch (error) {
    console.error(`Error fetching details for artwork ${objectID}:`, error);
    return null;
  }
};
