import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { SearchForm } from "../components/SearchForm";
import { Header } from "../components/Header";
import { SearchResults } from "../components/SearchResults";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

import "./SearchView.css";

export function SearchView() {
  const { moviePage, isLoading, error, searchMovies } = useMovieSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [searchString, setSearchString] = useState(initialQuery);
  const hasResults = (moviePage?.Search?.length ?? 0) > 0;

  useEffect(() => {
    if (initialQuery) {
      searchMovies(initialQuery);
    }
  }, [initialQuery, searchMovies]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovies(searchString);
    if (searchString.trim()) {
      setSearchParams({ q: searchString.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  return (
    <>
      <Header size={hasResults ? "small" : "large"} />
      <div>
        <SearchForm
          handleSubmit={handleSearch}
          loading={isLoading}
          searchString={searchString}
          handleInput={handleInput}
        />
      </div>
      {isLoading ? <LoadingSpinner /> : null}
      {error ? <ErrorMessage message={error} /> : null}
      {moviePage?.Search ? <SearchResults movies={moviePage.Search} /> : null}
      {!isLoading && !error && !hasResults && (
        <div className="search-view__no-results">No results found.</div>
      )}
    </>
  );
}
