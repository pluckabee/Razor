import { useMemo, useState } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import type { MovieReview } from "../types/types";

interface UserReviewCardProps {
  imdbID: string;
  reviews: MovieReview[];
  addUserReview: (review: MovieReview) => void;
  userId?: string;
}

export function UserReviewCard({
  imdbID,
  reviews,
  addUserReview,
  userId = "guest",
}: UserReviewCardProps) {
  const movieReviews = useMemo(
    () => reviews.filter((review) => review.imdbID === imdbID),
    [reviews, imdbID]
  );

  const currentReview = movieReviews.find((review) => review.userId === userId);

  const [score, setScore] = useState<number>(
    () => (currentReview?.score ? Number(currentReview.score) : 3)
  );
  const [rating, setRating] = useState<MovieReview["rating"]>(
    () => currentReview?.rating ?? "Just Okay"
  );
  const [reviewText, setReviewText] = useState<MovieReview["review"]>(
    () => currentReview?.review ?? ""
  );
  const [isEditing, setIsEditing] = useState(!currentReview);

  const ratingOptions: NonNullable<MovieReview["rating"]>[] = [
    "Top Tier",
    "Really Great",
    "Just Okay",
    "So bad its good",
    "Didn't like it",
    "Unwatchable",
  ];

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUserReview({
      imdbID,
      userId,
      score: String(score) as MovieReview["score"],
      rating,
      review: reviewText,
    });
    setIsEditing(false);
  };

  const resolvedRating = currentReview?.rating ?? rating;
  const resolvedReview = currentReview?.review ?? reviewText;

  return (
    <section className="single-title__reviews">
      <div className="single-title__section-header">
        <h2>User Review</h2>
        <button
          className="single-title__edit-button"
          type="button"
          onClick={() => setIsEditing((value) => !value)}
        >
          {isEditing ? "Close" : currentReview ? "Edit" : "Add"}
        </button>
      </div>
      {!isEditing ? (
        <div className="single-title__review-summary">
          <div className="single-title__tickets">
            {Array.from({ length: 5 }).map((_, index) => {
              const isActive = index < score;
              return (
                <ConfirmationNumberIcon
                  key={`ticket-${index}`}
                  className={`single-title__ticket${isActive ? " is-active" : ""}`}
                  aria-hidden="true"
                />
              );
            })}
          </div>
          <blockquote className="single-title__rating-quote">
            {resolvedRating ?? "No rating yet"}
          </blockquote>
          {resolvedReview ? (
            <div>
              <h3>Review</h3>
              <p className="single-title__review-copy">{resolvedReview}</p>
            </div>
          ) : (
            <p className="single-title__review-copy is-empty">
              Add your take on this film.
            </p>
          )}
        </div>
      ) : null}
      {isEditing ? (
        <form className="single-title__review-form" onSubmit={handleReviewSubmit}>
          <label>
            Score (1-5)
            <select
              value={score ?? 3}
              onChange={(event) =>
                setScore(event.target.value ? Number(event.target.value) : 3)
              }
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const value = String(index + 1);
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Rating
            <select
              value={rating ?? "Just Okay"}
              onChange={(event) =>
                setRating(event.target.value as MovieReview["rating"])
              }
            >
              {ratingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="single-title__review-text">
            Review
            <textarea
              rows={4}
              value={reviewText ?? ""}
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="What did you think?"
            />
          </label>
          <button type="submit">
            {currentReview ? "Update Review" : "Add Review"}
          </button>
        </form>
      ) : null}
    </section>
  );
}
