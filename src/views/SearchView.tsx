import { useState } from "react";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { Search } from "../components/Search";
import { SearchResults } from "../components/SearchResults";

export function SearchView() {
  const { moviePage, isLoading, error, searchMovies } = useMovieSearch();
  const [searchString, setSearchString] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovies(searchString);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  return (
    <>
      <div>
        <Search
          handleSubmit={handleSearch}
          loading={isLoading}
          searchString={searchString}
          handleInput={handleInput}
        />
      </div>
      {isLoading ? <div>Loader</div> : null}
      {error ? <div>Error {error}</div> : null}
      <div>Results</div>
      {moviePage?.Search ? (
        <SearchResults movies={moviePage.Search} />
      ) : null}
    </>
  );
}
