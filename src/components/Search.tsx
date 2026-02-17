import { type ChangeEvent, type SubmitEvent } from "react";

interface SearchFormProps {
  handleSubmit:  (e: SubmitEvent<HTMLFormElement>) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  searchString: string;
  loading?: boolean;
  error?: string | null;
}

export function Search({ handleSubmit, handleInput, searchString, loading = false }: SearchFormProps) {


  return (
    <div className="search bar">
      <form onSubmit={handleSubmit}>
        {searchString}
        <input
          className="search-input"
          onChange={handleInput}
          disabled={loading}
          value={searchString}
        />
      </form>
    </div>
  );
}
