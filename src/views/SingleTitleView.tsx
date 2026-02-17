import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { useReviews } from "../hooks/useReviews";
import type { MovieReview } from "../types/types";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Header } from "../components/Header";
import "./SingleTitleView.css";

export function SingleTitleView() {
  const { imdbID } = useParams<{ imdbID: string }>();
  const { movie, isLoading, error } = useMovie({ imdbID });
  const { reviews, addUserReview } = useReviews();
  const userId = "guest";

  const movieReviews = useMemo(
    () => reviews.filter((review) => review.imdbID === imdbID),
    [reviews, imdbID]
  );

  const currentReview = movieReviews.find((review) => review.userId === userId);

  const [score, setScore] = useState<number>(
    () => currentReview?.score ? Number(currentReview.score) : 3    
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

  if (!imdbID) {
    return <div className="single-title">Missing movie id.</div>;
  }

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imdbID) {
      return;
    }
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
    <div className="single-title">
      <Header size="small" />
      {isLoading ? <div className="single-title__loader">Loading...</div> : null}
      {error ? <div className="single-title__error">Error {error}</div> : null}
      {movie ? (
        <>
          <section className="single-title__hero">
            <div className="single-title__poster">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="single-title__headline">
              <h1>
                {movie.Title}
                <span className="single-title__year">({movie.Year})</span>
              </h1>
              <p className="single-title__tagline">
                {movie.Rated} • {movie.Runtime} • {movie.Genre}
              </p>
              <p className="single-title__plot">{movie.Plot}</p>
              <div className="single-title__credits">
                <div>
                  <span>Director</span>
                  <strong>{movie.Director}</strong>
                </div>
                <div>
                  <span>Writer</span>
                  <strong>{movie.Writer}</strong>
                </div>
                <div>
                  <span>Stars</span>
                  <strong>{movie.Actors}</strong>
                </div>
              </div>
            </div>
          </section>

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
                      <p className="single-title__review-copy">
                        {resolvedReview}
                      </p>
                    </div>
                  ) : (
                    <p className="single-title__review-copy is-empty">
                      Add your take on this film.
                    </p>
                  )}
                </div>
              ) : null}
              {isEditing ? (
                <form
                  className="single-title__review-form"
                  onSubmit={handleReviewSubmit}
                >
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

          <section className="single-title__meta">
            <div>
              <h2>Critics & Ratings</h2>
              <p className="single-title__metascore">
                Metacritic: <strong>{movie.Metascore}</strong>
              </p>
            </div>
            <div className="single-title__ratings">
              {movie.Ratings.map((rating) => (
                <div key={rating.Source}>
                  <span>{rating.Source}</span>
                  <strong>{rating.Value}</strong>
                </div>
              ))}
            </div>
            <div className="single-title__extra">
              <span>IMDb: {movie.imdbRating} ({movie.imdbVotes} votes)</span>
              <span>Released: {movie.Released}</span>
              <span>Box Office: {movie.BoxOffice}</span>
              <span>Language: {movie.Language}</span>
              <span>Country: {movie.Country}</span>
              <span>Awards: {movie.Awards}</span>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
