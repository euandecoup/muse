import React, { useState } from "react";
import { searchHarvardArt } from "../../services/harvardApi";
import { searchRijksmuseum } from "../../services/rijksmuseumApi";
import { searchMetropolitanArt } from "../../services/metropolitanApi";
import { SearchResult, SearchFormProps } from "../../types/artwork";
import { Loader } from "lucide-react";
import styles from "./SearchForm.module.css";

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState({
    harvard: true,
    rijksmuseum: true,
    metropolitan: true,
  });

  const handleSourceToggle = (source: keyof typeof selectedSources) => {
    setSelectedSources((prev) => ({
      ...prev,
      [source]: !prev[source],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      setError("Please enter a search term");
      return;
    }

    if (!Object.values(selectedSources).some(Boolean)) {
      setError("Please select at least one museum source");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchPromises = [];

      if (selectedSources.harvard) {
        searchPromises.push(searchHarvardArt(trimmedTerm));
      }
      if (selectedSources.rijksmuseum) {
        searchPromises.push(searchRijksmuseum(trimmedTerm));
      }
      if (selectedSources.metropolitan) {
        searchPromises.push(searchMetropolitanArt(trimmedTerm));
      }

      const results = await Promise.all(searchPromises);

      const combinedResults: SearchResult = {
        artworks: results.flatMap((result) => result.artworks),
        totalResults: results.reduce(
          (sum, result) => sum + result.totalResults,
          0
        ),
      };

      if (combinedResults.artworks.length === 0) {
        setError("No artworks found. Try different search terms or museums.");
      }

      onSearch(combinedResults);
    } catch (error) {
      console.error("Error during search:", error);
      setError(
        "An error occurred while searching. Please try again or select different museums."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.searchInputWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for artworks"
            aria-label="Search for artworks"
          />
        </div>
        <button
          className={styles.searchButton}
          type="submit"
          disabled={isLoading}
          aria-label={isLoading ? "Searching" : "Search"}
        >
          {isLoading ? (
            <Loader className={styles.spinner} size={20} />
          ) : (
            "Search"
          )}
        </button>
      </form>
      <div className={styles.sourceSelectors}>
        <label className={styles.sourceLabel}>
          <input
            type="checkbox"
            checked={selectedSources.harvard}
            onChange={() => handleSourceToggle("harvard")}
          />
          Harvard Art Museums
        </label>
        <label className={styles.sourceLabel}>
          <input
            type="checkbox"
            checked={selectedSources.rijksmuseum}
            onChange={() => handleSourceToggle("rijksmuseum")}
          />
          Rijksmuseum
        </label>
        <label className={styles.sourceLabel}>
          <input
            type="checkbox"
            checked={selectedSources.metropolitan}
            onChange={() => handleSourceToggle("metropolitan")}
          />
          Metropolitan Museum
        </label>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default SearchForm;
