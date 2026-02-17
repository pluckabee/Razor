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
    () => (currentReview?.score ? Number(currentReview.score) : 0)
  );
  const [rating, setRating] = useState<MovieReview["rating"]>(
    () => currentReview?.rating
  );
  const [reviewText, setReviewText] = useState<MovieReview["review"]>(
    () => currentReview?.review ?? ""
  );
  const [isEditing, setIsEditing] = useState(!currentReview);
  const [hoverScore, setHoverScore] = useState<number | null>(null);

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

  const hasScore = Boolean(currentReview?.score);


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
          <div>
            <div className="single-title__tickets">
              {Array.from({ length: 5 }).map((_, index) => {
                const isActive = hasScore && index < score;
                const isHovered = hoverScore !== null && index < hoverScore;
                return (
                  <ConfirmationNumberIcon
                    key={`ticket-${index}`}
                    className={`single-title__ticket${isActive ? " is-active" : ""}${
                      isHovered ? " is-hovered" : ""
                    }`}
                    aria-hidden="true"
                    onMouseEnter={() => setHoverScore(index + 1)}
                    onMouseLeave={() => setHoverScore(null)}
                  />
                );
              })}
            </div>
            {!hasScore ? (
              <span className="single-title__empty-subline">no user score</span>
            ) : null}
          </div>
          <div>
            <blockquote className="single-title__rating-quote">
              {!currentReview?.rating ? "..." : currentReview.rating}
            </blockquote>
            {!currentReview?.rating ? (
              <span className="single-title__empty-subline">no user rating</span>
            ) : null}
          </div>
          {currentReview?.review ? (
            <div>
              <h3>Review</h3>
              <p className="single-title__review-copy">{currentReview.review}</p>
            </div>
          ) : (
            <>
              <p className="single-title__review-copy is-empty">
                Add your take on this film.
              </p>
              <span className="single-title__empty-subline">no user review</span>
            </>
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
