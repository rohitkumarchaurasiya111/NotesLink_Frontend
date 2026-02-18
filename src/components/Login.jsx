import { useNavigate } from "react-router-dom";
import { loginOrRegister } from "../api/authAPI";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Login() {

  const navigate = useNavigate();

  const handleGoogleSuccess = async (googleResponse) => {
    try {
      const googleIdToken = googleResponse.credential;

      const apiResponse = await loginOrRegister(googleIdToken);

      // Backend JWT
      console.log("Token:", apiResponse.data);

      const { token, name, email, role, collegeId } = apiResponse.data;

      localStorage.setItem("noteslink_token", token);
      localStorage.setItem("noteslink_user", JSON.stringify({ name, email, role, collegeId }));

      navigate("/subjects");

    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <GoogleLoginButton onSuccess={handleGoogleSuccess} />
    </div>
  );
}
