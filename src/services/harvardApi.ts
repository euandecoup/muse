import axios from "axios";
import { Artwork, SearchResult } from "../types/artwork";

const API_KEY = process.env.REACT_APP_HARVARD_API_KEY;
const BASE_URL = "https://api.harvardartmuseums.org";

export const searchHarvardArt = async (
  query: string
): Promise<SearchResult> => {
  if (!API_KEY) {
    console.error("Harvard Art Museums API key is not set");
    return { artworks: [], totalResults: 0 };
  }
  try {
    const response = await axios.get(`${BASE_URL}/object`, {
      params: {
        apikey: API_KEY,
        q: query,
        fields:
          "objectnumber,title,primaryimageurl,people,dated,culture,division,medium,dimensions",
        size: 20,
      },
    });
    const artworks: Artwork[] = response.data.records.map((record: any) => ({
      id: record.objectnumber,
      title: record.title,
      artist: record.people?.[0]?.name || "Unknown",
      date: record.dated,
      imageUrl: record.primaryimageurl,
      culture: record.culture,
      medium: record.medium,
      dimensions: record.dimensions,
      source: "Harvard Art Museums",
      moreInfoUrl: `https://www.harvardartmuseums.org/collections/object/${record.objectnumber}`,
    }));
    return {
      artworks,
      totalResults: response.data.info.totalrecords,
    };
  } catch (error) {
    console.error("Error fetching data from Harvard Art Museums API:", error);
    return { artworks: [], totalResults: 0 };
  }
};

export default searchHarvardArt;
