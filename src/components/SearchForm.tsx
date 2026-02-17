import { type ChangeEvent, type SubmitEvent } from "react";
import { TextField, Container, Button } from "@mui/material";
import "./SearchForm.css";

interface SearchFormProps {
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  searchString: string;
  loading?: boolean;
  error?: string | null;
}

export function SearchForm({
  handleSubmit,
  handleInput,
  searchString,
  loading = false,
}: SearchFormProps) {
  return (
    <form onSubmit={handleSubmit}>
        <Container  maxWidth="sm" className="search-container">
        <TextField
          className="search-input"
          onChange={handleInput}
          disabled={loading}
          value={searchString}
          label="Film Title"
          type="search"
          fullWidth
        />
        <Button className="search-button" type="submit" disabled={loading} variant="contained" size="medium">
          Search
        </Button>
    </Container>
      </form>

  );
}
