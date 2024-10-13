import axios from "axios";
import { Artwork, SearchResult } from "../types/artwork";
import { error } from "console";

const API_KEY = process.env.REACT_APP_RIJKSMUSEUM_API_KEY;
const BASE_URL = "https://www.rijksmuseum.nl/api/en";

export const serachRijksmuseum = async (
  query: string
): Promise<SearchResult> => {
  if (!API_KEY) {
    console.error("Rijksmuseum API key is not set");
    return { artworks: [], totalResults: 0 };
  }
  try {
    const response = await axios.get(`${BASE_URL}/collection`, {
      params: {
        key: API_KEY,
        q: query,
        ps: 20,
        format: "json",
        imgonly: true,
      },
    });

    const artworks: Artwork[] = response.data.artObjects.map((item: any) => ({
      id: item.id,
      title: item.title,
      artist: item.principalOrFirstMaker,
      date: item.longTitle.split(", ").pop() || "Unknown",
      imageUrl: item.webImage?.url || "",
      culture: item.productionPlaces?.[0] || "Unknown",
      medium: "",
      dimensions: "",
      source: "Rijksmuseum",
      moreInfoUrl:
        item.links?.web ||
        `https://www.rijksmuseum.nl/en/collection/${item.id}`,
    }));
    return {
      artworks,
      totalResults: response.data.count,
    };
  } catch (error) {
    console.error("Error fetching data from Rijksmuseum API:", error);
    return { artworks: [], totalResults: 0 };
  }
};
