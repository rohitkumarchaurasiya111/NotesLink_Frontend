import { Link } from "react-router-dom";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";
import NotesLinkFullLogoDark from "../assets/NotesLinkFullLogo_Dark.png";
import { useTheme } from "../contexts/ThemeContext";

export default function NotesLinkLogo({
  className = "",
  imgClassName = "",
}) {
  const { isDark } = useTheme();

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Go to NotesLink Home"
    >
      <img
        src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo}
        alt="NotesLink"
        className={`h-8 w-auto select-none ${imgClassName}`}
        draggable={false}
      />
    </Link>
  );
}
