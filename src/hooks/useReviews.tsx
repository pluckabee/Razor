import { useContext, createContext } from "react";

import type { MovieReview } from "../types/types";

export interface ReviewContextType {
  reviews: MovieReview[];
  addUserReview: (o: MovieReview) => void;
}

export const ReviewContext = createContext<ReviewContextType | undefined>(
  undefined,
);

export const useReviews = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
};
