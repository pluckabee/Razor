//Movie Results dumb component

import { MovieCard } from "./MovieCard";
import type { OMDBSearchResult } from "../types/types";



interface SearchResultsProps {
  movies: OMDBSearchResult[];
}

export function SearchResults({ movies }: SearchResultsProps) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}