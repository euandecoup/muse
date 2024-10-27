import { searchMetropolitanArt } from "../metropolitanApi";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Metropolitan Museum API Service", () => {
  it("successfully fetches artworks", async () => {
    const mockSearchResponse = {
      data: {
        total: 1,
        objectIDs: [1234],
      },
    };

    const mockArtworkResponse = {
      data: {
        objectID: 1234,
        title: "Test Met Artwork",
        artistDisplayName: "Test Met Artist",
        objectDate: "1900",
        primaryImage: "http://test.com/met-image.jpg",
        culture: "American",
        medium: "Watercolor",
        dimensions: "50 x 50 cm",
        objectURL: "http://test.com/met-artwork",
      },
    };

    require("axios")
      .get.mockImplementationOnce(() => Promise.resolve(mockSearchResponse))
      .mockImplementationOnce(() => Promise.resolve(mockArtworkResponse));

    const result = await searchMetropolitanArt("test");

    expect(result.artworks).toHaveLength(1);
    expect(result.artworks[0]).toEqual({
      id: "1234",
      title: "Test Met Artwork",
      artist: "Test Met Artist",
      date: "1900",
      imageUrl: "http://test.com/met-image.jpg",
      culture: "American",
      medium: "Watercolor",
      dimensions: "50 x 50 cm",
      source: "Metropolitan Museum of Art",
      moreInfoUrl: "http://test.com/met-artwork",
    });
    expect(result.totalResults).toBe(1);
  });

  it("handles errors gracefully", async () => {
    require("axios").get.mockRejectedValue(new Error("API Error"));

    const result = await searchMetropolitanArt("test");

    expect(result.artworks).toHaveLength(0);
    expect(result.totalResults).toBe(0);
  });
});
