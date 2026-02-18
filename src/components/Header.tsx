import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router";
import "./Header.css";

interface HeaderProps {
  size?: "large" | "small";
  backTo?: string;
  backLabel?: string;
  useBrowserBack?: boolean;
}

export function Header({
  size = "large",
  backTo,
  backLabel = "Back to search",
  useBrowserBack = false,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (useBrowserBack) {
      navigate(-1);
    }
  };

  return (
    <header className={`app-header app-header--${size}`}>
      {useBrowserBack ? (
        <button
          className="app-header__back"
          type="button"
          onClick={handleBackClick}
        >
          <ArrowBackIcon aria-hidden="true" />
          <span>{backLabel}</span>
        </button>
      ) : backTo ? (
        <Link className="app-header__back" to={backTo}>
          <ArrowBackIcon aria-hidden="true" />
          <span>{backLabel}</span>
        </Link>
      ) : null}
      <Link className="app-header__home-link" to="/" aria-label="Go home">
        <div className="app-header__icon-container">
          <ConfirmationNumberIcon
            className="app-header__icon"
            aria-hidden="true"
          />
          <ConfirmationNumberIcon
            className="app-header__icon"
            aria-hidden="true"
          />
          <ConfirmationNumberIcon
            className="app-header__icon"
            aria-hidden="true"
          />
          <ConfirmationNumberIcon
            className="app-header__icon"
            aria-hidden="true"
          />
          <ConfirmationNumberIcon
            className="app-header__icon"
            aria-hidden="true"
          />
        </div>
        <span className="app-header__title">Razor Film Reviews</span>
      </Link>
    </header>
  );
}
