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

    if (!objectIDs.length) {
      return { artworks: [], totalResults: 0 };
    }

    const limitedObjectIDs = objectIDs.slice(0, 20);

    const artworkResults = await Promise.allSettled(
      limitedObjectIDs.map((id) => getMetropolitanArtworkDetails(id))
    );

    const validArtworks = artworkResults
      .filter(
        (result): result is PromiseFulfilledResult<Artwork | null> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value)
      .filter((artwork): artwork is Artwork => artwork !== null);

    return {
      artworks: validArtworks,
      totalResults: Math.min(totalResults, validArtworks.length),
    };
  } catch (error) {
    console.error("Error fetching data from Metropolitan Museum API:", error);
    return { artworks: [], totalResults: 0 };
  }
};

export const getMetropolitanArtworkDetails = async (
  objectID: number
): Promise<Artwork | null> => {
  try {
    const response = await axios.get<MetropolitanArtworkResponse>(
      `${BASE_URL}/objects/${objectID}`,
      {
        timeout: 5000,
      }
    );

    const data = response.data;

    if (!data.title || !data.primaryImage) {
      console.log(
        `Skipping artwork ${objectID} due to missing required fields`
      );
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
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log(`Artwork ${objectID} not found in Metropolitan Museum API`);
    } else {
      console.error(`Error fetching details for artwork ${objectID}:`, error);
    }
    return null;
  }
};
