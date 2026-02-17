import { useMovie } from "../hooks/useMovie";
import { useParams } from "react-router";

export function SingleTitleView() {
  const { imdbID, title } = useParams<{ imdbID: string; title: string }>();
  const { movie, isLoading, error } = useMovie({ imdbID, title });

  return (
    <>
      <div>Single Title View</div>
      {isLoading ? <div>Loader</div> : null}
      {error ? <div>Error</div> : null}
      <div>Results</div>
      <div>{JSON.stringify(movie)}</div>
    </>
  );
}
