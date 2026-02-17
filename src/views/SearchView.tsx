import { useMovies } from "../hooks/useMovieSearch";

export function SearchView() {
  const { moviePage, isLoading, error, searchMovies } = useMovies();

  const handleSearch = async (title: string) => {
    searchMovies(title);
  };

  return (
    <>
      <div>
        Search Component
        <button
          onClick={() => {
            handleSearch("Batman");
          }}
        >
          Search
        </button>
      </div>
      {isLoading ? <div>Loader</div> : null}
      {error ? <div>Error {error}</div> : null}
      <div>Results</div>
      <div>{JSON.stringify(moviePage)}</div>
    </>
  );
}
