import axios from "axios";
import {
  Artwork,
  SearchResult,
  MetropolitanApiResponse,
  MetropolitanArtworkResponse,
} from "../types/artwork";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const PUBLIC_DEPARTMENTS = [
  1, 3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
];

function isValidHttpUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const getMetropolitanArtworkDetails = async (
  objectID: number
): Promise<Artwork | null> => {
  try {
    const response = await axios.get<MetropolitanArtworkResponse>(
      `${BASE_URL}/objects/${objectID}`
    );

    const data = response.data;

    if (
      !data.title ||
      !data.primaryImage ||
      !isValidHttpUrl(data.primaryImage)
    ) {
      return null;
    }

    return {
      id: data.objectID.toString(),
      title: data.title,
      artist: data.artistDisplayName || "Unknown Artist",
      date: data.objectDate || "Unknown Date",
      imageUrl: data.primaryImage,
      culture: data.culture || "Unknown Culture",
      medium: data.medium || "",
      dimensions: data.dimensions || "",
      source: "Metropolitan Museum of Art",
      moreInfoUrl:
        data.objectURL ||
        `https://www.metmuseum.org/art/collection/search/${data.objectID}`,
    };
  } catch (error) {
    console.error(`Error fetching artwork ${objectID}:`, error);
    return null;
  }
};

export const searchMetropolitanArt = async (
  query: string
): Promise<SearchResult> => {
  try {
    const searchPromises = PUBLIC_DEPARTMENTS.map((deptId) =>
      axios.get<MetropolitanApiResponse>(`${BASE_URL}/search`, {
        params: {
          q: query,
          hasImages: true,
          departmentId: deptId,
        },
      })
    );

    const searchResults = await Promise.all(searchPromises);

    const objectIDs = Array.from(
      new Set(
        searchResults
          .flatMap((response) => response.data.objectIDs || [])
          .filter(Boolean)
      )
    );

    const totalResults = objectIDs.length;

    if (!objectIDs.length) {
      return { artworks: [], totalResults: 0 };
    }

    const limitedObjectIDs = objectIDs.slice(0, 20);
    const artworkPromises = limitedObjectIDs.map(getMetropolitanArtworkDetails);

    const artworkResults = await Promise.all(artworkPromises);
    const validArtworks = artworkResults.filter(
      (artwork): artwork is Artwork => artwork !== null
    );

    return {
      artworks: validArtworks,
      totalResults: Math.min(totalResults, validArtworks.length),
    };
  } catch (error) {
    console.error("Error fetching data from Metropolitan Museum API:", error);
    return { artworks: [], totalResults: 0 };
  }
};
