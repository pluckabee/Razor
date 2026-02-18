import { useMemo, useState } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import type { MovieReview } from "../types/types";
import "./UserReviewCard.css";

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
    [reviews, imdbID],
  );

  const currentReview = movieReviews.find((review) => review.userId === userId);

  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(false);
  const [isRatingEditing, setIsRatingEditing] = useState(false);
  const [ratingValue, setRatingValue] = useState<MovieReview["rating"] | "">(
    () => currentReview?.rating ?? "",
  );
  const [isReviewEditing, setIsReviewEditing] = useState(false);
  const [reviewDraft, setReviewDraft] = useState(
    () => currentReview?.review ?? "",
  );
  const [hoverReview, setHoverReview] = useState(false);
  const score = currentReview?.score ? Number(currentReview.score) : 0;
  const hasScore = Boolean(currentReview?.score);

  const ratingOptions: NonNullable<MovieReview["rating"]>[] = [
    "Top Tier",
    "Really Great",
    "Just Okay",
    "So bad its good",
    "Didn't like it",
    "Unwatchable",
  ];

  const handleScoreClick = (value: number) => {
    addUserReview({
      imdbID,
      userId,
      score: String(value) as MovieReview["score"],
      rating: currentReview?.rating,
      review: currentReview?.review,
    });
  };

  const handleRatingChange = (value: MovieReview["rating"] | "") => {
    setRatingValue(value);
    if (value) {
      addUserReview({
        imdbID,
        userId,
        score: currentReview?.score,
        rating: value,
        review: currentReview?.review,
      });
      setIsRatingEditing(false);
    }
  };

  const handleReviewSave = () => {
    addUserReview({
      imdbID,
      userId,
      score: currentReview?.score,
      rating: currentReview?.rating,
      review: reviewDraft,
    });
    setIsReviewEditing(false);
  };

  const handleReviewCancel = () => {
    setReviewDraft(currentReview?.review ?? "");
    setIsReviewEditing(false);
  };

  return (
    <section className="user-review-card">
      <div className="user-review-card__header">
        <h2>My Review</h2>
      </div>
      <div className="user-review-card__summary">
        <div>
          <div className="user-review-card__tickets">
            {Array.from({ length: 5 }).map((_, index) => {
              const isActive = hasScore && index < score;
              const isHovered = hoverScore !== null && index < hoverScore;
              return (
                <ConfirmationNumberIcon
                  key={`ticket-${index}`}
                  className={`user-review-card__ticket${isActive ? " is-active" : ""}${
                    isHovered ? " is-hovered" : ""
                  }`}
                  aria-hidden="true"
                  onMouseEnter={() => setHoverScore(index + 1)}
                  onMouseLeave={() => setHoverScore(null)}
                  onClick={() => handleScoreClick(index + 1)}
                />
              );
            })}
          </div>
          <span className="user-review-card__subline">
            {hoverScore !== null
              ? "update score"
              : !hasScore
                ? "no user score"
                : `${score}/5`}
          </span>
        </div>
        <div>
          <blockquote
            className="user-review-card__rating-quote user-review-card__rating-quote--interactive"
            onClick={() => setIsRatingEditing(true)}
            onMouseEnter={() => setHoverRating(true)}
            onMouseLeave={() => setHoverRating(false)}
            role="button"
            tabIndex={0}
          >
            {isRatingEditing ? (
              <FormControl size="small" fullWidth>
                <Select
                  value={ratingValue}
                  displayEmpty
                  onChange={(event) => {
                    handleRatingChange(
                      event.target.value as MovieReview["rating"],
                    );
                  }}
                  onClose={() => setIsRatingEditing(false)}
                >
                  <MenuItem value="" disabled>
                    Select rating
                  </MenuItem>
                  {ratingOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <p>{!currentReview?.rating ? "..." : currentReview.rating}</p>
            )}
          </blockquote>
          <span className="user-review-card__subline">
            {hoverRating
              ? "update rating"
              : !currentReview?.rating
                ? "no user rating"
                : ""}
          </span>
        </div>
        <div>
          <h3>Full Review</h3>
          {isReviewEditing ? (
            <>
              <TextField
                className="user-review-card__textarea"
                multiline
                minRows={4}
                value={reviewDraft}
                onChange={(event) => setReviewDraft(event.target.value)}
              />
              <div className="user-review-card__actions">
                <Button
                  className="user-review-card__save"
                  variant="contained"
                  type="button"
                  onClick={handleReviewSave}
                >
                  Save review
                </Button>
                <Button
                  className="user-review-card__cancel"
                  variant="text"
                  type="button"
                  onClick={handleReviewCancel}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : currentReview?.review ? (
            <p
              className="user-review-card__review-copy user-review-card__review-copy--interactive"
              onMouseEnter={() => setHoverReview(true)}
              onMouseLeave={() => setHoverReview(false)}
              onClick={() => setIsReviewEditing(true)}
              role="button"
              tabIndex={0}
            >
              {currentReview.review}
            </p>
          ) : (
            <span
              className="user-review-card__subline user-review-card__trigger"
              role="button"
              tabIndex={0}
              onClick={() => setIsReviewEditing(true)}
            >
              Add your take on this film.
            </span>
          )}
          <span className="user-review-card__subline">
            {hoverReview
              ? "update review"
              : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
