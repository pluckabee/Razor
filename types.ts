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

type UserRatingSourceId = `Razor:${UserId}:${UserReviewType}`
type UserId = string;

export interface User {
    userId: UserId;
}

export interface UserRatingSource extends OMDBRating {
    Source: UserRatingSourceId;
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
  Search: OMDBSearchResponse[];
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
  Genre: string[];
  Director: string;
  Writer: string[];
  Actor: string;
  Plot: string;
  Language: string[];
  Country: string[];
  Awards: string;
  Ratings: OMDBRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: number;
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
