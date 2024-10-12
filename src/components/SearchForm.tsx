import React, { useState } from "react";
import { searchHarvardArt } from "../services/harvardApi";
import { searchRijksmuseum } from "../services/rijksmuseumApi";
import { searchMetropolitanArt } from "../services/metropolitanApi";
import { Artwork } from "../types/artwork";

interface SearchFormProps {
  onSearch: (results: Artwork[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const harvardResults = await searchHarvardArt(searchTerm);
    const rijksmuseumResults = await searchRijksmuseum(searchTerm);
    const metropolitanResults = await searchMetropolitanArt(searchTerm);

    const combinedResults = [
      ...harvardResults,
      ...rijksmuseumResults,
      ...metropolitanResults,
    ];
    onSearch(combinedResults);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for artworks"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
