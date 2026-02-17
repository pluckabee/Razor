//Movie card. big picture show title and year. Hover for a bit more information

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { OMDBSearchResult } from "../types/types";
import { useMovie } from "../hooks/useMovie";
import "./MovieCard.css";

interface MovieCardProps {
  movie: OMDBSearchResult;
}

const HOVER_DEBOUNCE_MS = 300;

export function MovieCard({ movie }: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeout = useRef<number | null>(null);
  const { movie: details, isLoading, error, loadMovie } = useMovie({
    imdbID: movie.imdbID,
    enabled: false,
  });

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    clearHoverTimeout();
    hoverTimeout.current = window.setTimeout(() => {
      setIsExpanded(true);
    }, HOVER_DEBOUNCE_MS);
  };

  const handleMouseLeave = () => {
    clearHoverTimeout();
    setIsExpanded(false);
  };

  useEffect(() => {
    if (isExpanded) {
      loadMovie();
    }
  }, [isExpanded, loadMovie]);

  return (
    <div
      className={`movie-card${isExpanded ? " expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-card__header">
        <h2>{movie.Title}</h2>
        <span className="movie-card__year">{movie.Year}</span>
      </div>
      <img src={movie.Poster} alt={movie.Title} className="movie-card__poster" />
      <Link to={`/movie/${movie.imdbID}`} className="movie-card__link">
        More Info
      </Link>
      <div className="movie-card__details" aria-hidden={!isExpanded}>
        {isLoading ? <div className="movie-card__loading">Loading...</div> : null}
        {error ? <div className="movie-card__error">{error}</div> : null}
        {details ? (
          <>
            <p className="movie-card__plot">{details.Plot}</p>
            <div className="movie-card__meta">
              <span>{details.Genre}</span>
              <span>{details.Runtime}</span>
              <span>IMDb {details.imdbRating}</span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
