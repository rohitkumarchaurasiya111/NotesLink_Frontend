import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
}