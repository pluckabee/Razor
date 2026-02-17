import { useMemo, useState } from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditIcon from "@mui/icons-material/Edit";
import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
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
    <section className="single-title__reviews">
      <div className="single-title__section-header">
        <h2>User Review</h2>
      </div>
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
                  onClick={() => handleScoreClick(index + 1)}
                />
              );
            })}
          </div>
          <span className="single-title__empty-subline">
            {hoverScore !== null
              ? "update score"
              : !hasScore
                ? "no user score"
                : ""}
          </span>
        </div>
        <div>
          <blockquote
            className="single-title__rating-quote single-title__rating-quote--interactive"
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
          <span className="single-title__empty-subline">
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
                className="single-title__review-textarea"
                multiline
                minRows={4}
                value={reviewDraft}
                onChange={(event) => setReviewDraft(event.target.value)}
              />
              <div className="single-title__review-actions">
                <Button
                  className="single-title__review-save"
                  variant="contained"
                  type="button"
                  onClick={handleReviewSave}
                >
                  Save review
                </Button>
                <Button
                  className="single-title__review-cancel"
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
              className="single-title__review-copy single-title__review-copy--interactive"
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
              className="single-title__empty-subline single-title__review-trigger"
              role="button"
              tabIndex={0}
              onClick={() => setIsReviewEditing(true)}
            >
              Add your take on this film.
              <EditIcon className="single-title__review-icon" aria-hidden="true" fontSize="small" />
            </span>
          )}
          <span className="single-title__empty-subline">
            {hoverReview
              ? "update review"
              : currentReview?.review
                ? ""
                : "no user review"}
          </span>
        </div>
      </div>
    </section>
  );
}
