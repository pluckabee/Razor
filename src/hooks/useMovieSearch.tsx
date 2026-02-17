import { useState, useCallback } from "react";
import type { OMDBSearchResponse } from "../types/types";

import { apiService } from "../services/movie-api";

export const useMovies = () => {
  const [moviePage, setMoviePage] = useState<OMDBSearchResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (title: string) => {
    setIsLoading(true);
    const response = await apiService.SearchMovies(title);
    try {
      if (response.success && response.data) {
        setMoviePage(response.data);
        setError(null);
      } else {
        setError(response.error || "Failed to load humans");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { moviePage, isLoading, error, searchMovies };
};
