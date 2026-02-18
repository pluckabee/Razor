import { useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { useReviews } from "../hooks/useReviews";
import { Header } from "../components/Header";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserReviewCard } from "../components/UserReviewCard";
import "./SingleTitleView.css";

export function SingleTitleView() {
  const { imdbID } = useParams<{ imdbID: string }>();
  const { movie, isLoading, error } = useMovie({ imdbID });
  const { reviews, addUserReview } = useReviews();

  if (!imdbID) {
    return <div className="single-title">Missing movie id.</div>;
  }

  return (
    <div className="single-title">
  <Header size="small" useBrowserBack />
      {isLoading ? <LoadingSpinner /> : null}
      {error ? <ErrorMessage message={error} /> : null}
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

          <UserReviewCard
            imdbID={imdbID}
            reviews={reviews}
            addUserReview={addUserReview}
          />

          <section className="single-title__meta">
            <div>
              <h2>Critics & Ratings</h2>
              <p className="single-title__metascore">
                IMDb:  <strong>{movie.imdbRating}</strong> ({movie.imdbVotes} votes)
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
