type StringBoolean = "True" | "False";

type UserReviewType = "score" | "rating" | "review";
type UserScore = "1" | "2" | "3" | "4" | "5";
type UserRating =
  | "Top Tier"
  | "Really Great"
  | "Just Okay"
  | "So bad its good"
  | "Pretty Bad"
  | "Unwatchable";

type UserReview = string;

type UserSourcedRatingId = `Razor:${string}:${UserId}:${UserReviewType}`
type UserId = string;

export interface User {
    userId: UserId;
}

export interface UserSourcedRating extends OMDBRating {
    Source: UserSourcedRatingId;
    Value: UserScore | UserRating | string;
}

export interface MovieReview extends Pick<OMDBMovie, "imdbID"> {
  userId: UserId;
  score?: UserScore;
  rating?: UserRating;
  review?: UserReview
}

type OMDBResultType = "movie" | "series" | "episode";

export interface OMDBSearchResponse {
  Search: OMDBSearchResult[];
  totalResults: number;
  Response: StringBoolean;
}

export interface OMDBRating {
    Source: string;
    Value: string;
}

export interface OMDBMovie {
  Title: string;
  imdbID: string;
  Year: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: OMDBRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: "movie";
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: StringBoolean;
}

export interface OMDBSearchResult extends Pick<OMDBMovie, "Title"| "imdbID"| "Year"| "Poster"> {
    Type: OMDBResultType
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
