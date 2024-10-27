import { searchRijksmuseum } from "../rijksmuseumApi";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Rijksmuseum API Service", () => {
  it("successfully fetches artworks", async () => {
    const mockApiResponse = {
      data: {
        count: 1,
        artObjects: [
          {
            id: "SK-A-1234",
            title: "Test Dutch Artwork",
            principalOrFirstMaker: "Test Dutch Artist",
            longTitle: "Test Dutch Artwork, Test Dutch Artist, 1666",
            webImage: {
              url: "http://test.com/dutch-image.jpg",
            },
            productionPlaces: ["Amsterdam"],
            links: {
              web: "http://test.com/artwork",
            },
          },
        ],
      },
    };

    require("axios").get.mockResolvedValue(mockApiResponse);

    const result = await searchRijksmuseum("test");

    expect(result.artworks).toHaveLength(1);
    expect(result.artworks[0]).toEqual({
      id: "SK-A-1234",
      title: "Test Dutch Artwork",
      artist: "Test Dutch Artist",
      date: "1666",
      imageUrl: "http://test.com/dutch-image.jpg",
      culture: "Amsterdam",
      medium: "",
      dimensions: "",
      source: "Rijksmuseum",
      moreInfoUrl: "http://test.com/artwork",
    });
    expect(result.totalResults).toBe(1);
  });

  it("handles errors gracefully", async () => {
    require("axios").get.mockRejectedValue(new Error("API Error"));

    const result = await searchRijksmuseum("test");

    expect(result.artworks).toHaveLength(0);
    expect(result.totalResults).toBe(0);
  });
});
