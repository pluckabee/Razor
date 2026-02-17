import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import "./Header.css";

interface HeaderProps {
  size?: "large" | "small";
}

export function Header({ size = "large" }: HeaderProps) {
  return (
    <header className={`app-header app-header--${size}`}>
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
    </header>
  );
}
