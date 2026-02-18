import { useLocation, useNavigate } from "react-router-dom";
import { loginOrRegister } from "../api/authAPI";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {

  const navigate = useNavigate();

  //if user is already logged in redirect them to other page
  const location = useLocation();
  const redirectPath = location.state?.from || "/subjects";     // Where user tried to go before redirect

  useEffect(() => {
    const token = localStorage.getItem("noteslink_token");
    try {
      if (token) {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          navigate(redirectPath, { replace: true });
        } else {
          localStorage.removeItem("noteslink_token");
          localStorage.removeItem("noteslink_user");
        }
      }
    } catch (error) {                         //if the token is manipulated
      console.error("Invalid token:", error);
      localStorage.removeItem("noteslink_token");
      localStorage.removeItem("noteslink_user");
    }
  }, [navigate, redirectPath]);


  const handleGoogleSuccess = async (googleResponse) => {
    try {
      const googleIdToken = googleResponse.credential;

      const apiResponse = await loginOrRegister(googleIdToken);

      // Backend JWT
      console.log("Token:", apiResponse.data);

      const { token, name, email, role, collegeId } = apiResponse.data;

      localStorage.setItem("noteslink_token", token);
      localStorage.setItem("noteslink_user", JSON.stringify({ name, email, role, collegeId }));

      navigate(redirectPath, { replace: true });

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
