import type {
  ApiResponse,
  OMDBSearchResponse,
  OMDBMovie,
} from "../types/types";

const MOVIE_ID_CACHE_PREFIX = "razor:movie:id:";
const MOVIE_TITLE_INDEX_PREFIX = "razor:movie:title:";

const normalizeTitle = (title: string) => title.trim().toLowerCase();

const getCachedMovieById = (imdbID: string): OMDBMovie | null => {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    const cached = window.localStorage.getItem(
      `${MOVIE_ID_CACHE_PREFIX}${imdbID}`
    );
    if (!cached) {
      return null;
    }
    return JSON.parse(cached) as OMDBMovie;
  } catch {
    return null;
  }
};

const getCachedImdbIdByTitle = (title: string): string | null => {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    return window.localStorage.getItem(
      `${MOVIE_TITLE_INDEX_PREFIX}${normalizeTitle(title)}`
    );
  } catch {
    return null;
  }
};

const setCachedMovieById = (movie: OMDBMovie) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(
      `${MOVIE_ID_CACHE_PREFIX}${movie.imdbID}`,
      JSON.stringify(movie)
    );
  } catch {
    // Ignore cache write failures (storage full, etc.)
  }
};

const setCachedImdbIdForTitle = (title: string, imdbID: string) => {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(
      `${MOVIE_TITLE_INDEX_PREFIX}${normalizeTitle(title)}`,
      imdbID
    );
  } catch {
    // Ignore cache write failures (storage full, etc.)
  }
};

class ApiService {
  private async request<T>(
    queryString: string,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_OMDB_API_BASE_URL}?apiKey=${import.meta.env.VITE_OMDB_API_KEY}&${queryString}`
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      //if no entries, delay the response to simulate network latency and show loading state
      if (data.Search?.length === 0 || data.Response === "False") {

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async SearchMovies(title: string): Promise<ApiResponse<OMDBSearchResponse>> {
    return this.request(`s=${title}&type=movie`);
  }

  async FindMovieByTitle(title: string): Promise<ApiResponse<OMDBMovie>> {
    const cachedImdbId = getCachedImdbIdByTitle(title);
    if (cachedImdbId) {
      const cachedMovie = getCachedMovieById(cachedImdbId);
      if (cachedMovie) {
        return {
          success: true,
          data: cachedMovie,
        };
      }
    }

    const response = await this.request<OMDBMovie>(`t=${title}&type=movie`);
    if (response.success && response.data) {
      setCachedMovieById(response.data);
      setCachedImdbIdForTitle(title, response.data.imdbID);
    }
    return response;
  }

  async FindMovieById(id: string): Promise<ApiResponse<OMDBMovie>> {
      const cachedMovie = getCachedMovieById(id);
      if (cachedMovie) {
        return {
          success: true,
          data: cachedMovie,
        };
      }
      const response = await this.request<OMDBMovie>(`i=${id}&type=movie`);
      if (response.success && response.data) {
        setCachedMovieById(response.data);
      }
      return response;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
