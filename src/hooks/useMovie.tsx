import { useState, useCallback, useEffect } from "react";
import type { OMDBMovie } from "../types/types";

import { apiService } from "../services/movie-api";

export const useMovie = ({
  title,
  imdbID,
  enabled = true,
}: {
  title?: string;
  imdbID?: string;
  enabled?: boolean;
}) => {
  const [movie, setMovie] = useState<OMDBMovie>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMovie = useCallback(async () => {
    let response;
    setIsLoading(true);
    try {
      if (imdbID) {
        response = await apiService.FindMovieById(imdbID);
      } else if (title) {
        response = await apiService.FindMovieByTitle(title);
      } else {
        throw new Error("No title or id provided")
      }
      if (response.success && response.data) {
        setMovie(response.data);
        setError(null);
      } else {
        setError(response.error || "Failed to load humans");
      }
    } finally {
      setIsLoading(false);
    }
  }, [title, imdbID]);

  useEffect(() => {
    if (enabled) {
      loadMovie();
    }
  }, [enabled, loadMovie]);

  return { movie, isLoading, error, loadMovie };
};
