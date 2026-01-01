import { Link } from "react-router-dom";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";

export default function NotesLinkLogo({
  className = "",
  imgClassName = "",
}) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Go to NotesLink Home"
    >
      <img
        src={NotesLinkFullLogo}
        alt="NotesLink"
        className={`h-8 w-auto select-none ${imgClassName}`}
        draggable={false}
      />
    </Link>
  );
}
