import React, { useState } from "react";
import { searchHarvardArt } from "../services/harvardApi";
import { searchRijksmuseum } from "../services/rijksmuseumApi";
import { searchMetropolitanArt } from "../services/metropolitanApi";
import { SearchResult, SearchFormProps } from "../types/artwork";

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const [harvardResults, rijksmuseumResults, metropolitanResults] =
        await Promise.all([
          searchHarvardArt(searchTerm),
          searchRijksmuseum(searchTerm),
          searchMetropolitanArt(searchTerm),
        ]);

      const combinedResults: SearchResult = {
        artworks: [
          ...harvardResults.artworks,
          ...rijksmuseumResults.artworks,
          ...metropolitanResults.artworks,
        ],
        totalResults:
          harvardResults.totalResults +
          rijksmuseumResults.totalResults +
          metropolitanResults.totalResults,
      };

      onSearch(combinedResults);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for artworks"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;
