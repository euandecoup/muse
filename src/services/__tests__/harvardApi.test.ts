import { searchHarvardArt } from "../harvardApi";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Harvard Art API Service", () => {
  it("successfully fetches artworks", async () => {
    const mockApiResponse = {
      data: {
        info: { totalRecords: 1 },
        records: [
          {
            objectnumber: "1234",
            title: "Test Artwork",
            people: [{ name: "Test Artist" }],
            dated: "2000",
            primaryimageurl: "http://test.com/image.jpg",
            culture: "Test Culture",
            medium: "Oil on canvas",
            dimensions: "100 x 100 cm",
          },
        ],
      },
    };

    require("axios").get.mockResolvedValue(mockApiResponse);

    const result = await searchHarvardArt("test");

    expect(result.artworks).toHaveLength(1);
    expect(result.artworks[0]).toEqual({
      id: "1234",
      title: "Test Artwork",
      artist: "Test Artist",
      date: "2000",
      imageUrl: "http://test.com/image.jpg",
      culture: "Test Culture",
      medium: "Oil on canvas",
      dimensions: "100 x 100 cm",
      source: "Harvard Art Museums",
      moreInfoUrl: "https://www.harvardartmuseums.org/collections/object/1234",
    });
  });

  it("handles errors gracefully", async () => {
    require("axios").get.mockRejectedValue(new Error("API Error"));

    const result = await searchHarvardArt("test");

    expect(result.artworks).toHaveLength(0);
    expect(result.totalResults).toBe(0);
  });
});
