import type {
  ApiResponse,
  OMDBSearchResponse,
  OMDBMovie,
} from "../types/types";

const VITE_OMDB_API_KEY="5a2dc3ba"
const OMDB_API_BASE_URL="http://www.omdbapi.com/"

class ApiService {
  private async request<T>(
    queryString: string,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(
        `${OMDB_API_BASE_URL}?apiKey=${VITE_OMDB_API_KEY}&${queryString}`
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
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
    //TODO Check cache first
    return this.request(`t=${title}&type=movie`);
    
  }

  async FindMovieById(id: string): Promise<ApiResponse<OMDBMovie>> {
    //TODO Check cache first
    return this.request(`i=${id}&type=movie`);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
