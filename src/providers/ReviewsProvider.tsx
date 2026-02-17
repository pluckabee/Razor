import React, { useState, useEffect, useCallback } from "react";
import type { MovieReview } from "../types/types";

import type { ReviewContextType } from "../hooks/useReviews";
import { ReviewContext } from "../hooks/useReviews";

const REVIEWS_STORAGE_KEY = "reviews";

function getInitialState() {
  const storedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
  return storedReviews ? JSON.parse(storedReviews) : [];
}

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reviews, setReviews] = useState<MovieReview[]>(getInitialState);

  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addUserReview = useCallback(
    (userReview: MovieReview) => {
      const existingReview = reviews.filter(
        (review) =>
          review.userId === userReview.userId &&
          review.imdbID === userReview.imdbID,
      )?.[0];

      if (existingReview) {
        setReviews(
          reviews.map((review) => {
            if (
              review.userId === userReview.userId &&
              review.imdbID === userReview.imdbID
            ) {
              review = { ...review, ...userReview };
            }
            return review;
          }),
        );
      } else {
        setReviews([...reviews, userReview]);
      }
    },
    [reviews, setReviews],
  );

  const value: ReviewContextType = {
    reviews,
    addUserReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};
