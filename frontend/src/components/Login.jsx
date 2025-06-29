import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function SpotifyLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleContinue = () => {
    if (email.trim()) {
      // Redirect to home page
      window.location.href = "/";
    }
    dispatch(login("dummyuser@example.com"));
    navigate(from, { replace: true });
  };

  const handleSocialLogin = (provider) => {
    // Redirect to home page for social login
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Spotify Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
          <h1 className="text-white text-4xl font-bold">Log in to Spotify</h1>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full bg-transparent border border-gray-600 text-white py-3 px-6 rounded-full flex items-center justify-center hover:border-white transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialLogin("facebook")}
            className="w-full bg-transparent border border-gray-600 text-white py-3 px-6 rounded-full flex items-center justify-center hover:border-white transition-colors"
          >
            <svg
              className="w-5 h-5 mr-3 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </button>

          <button
            onClick={() => handleSocialLogin("apple")}
            className="w-full bg-transparent border border-gray-600 text-white py-3 px-6 rounded-full flex items-center justify-center hover:border-white transition-colors"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.017 0C8.996 0 8.584.014 7.301.075 6.019.136 5.157.346 4.41.65c-.764.296-1.415.69-2.061 1.336C1.703 2.632 1.31 3.283 1.013 4.047c-.304.747-.514 1.609-.575 2.891C.376 8.224.363 8.636.363 11.657s.014 3.433.075 4.716c.061 1.282.271 2.144.575 2.891.297.764.69 1.415 1.336 2.061.646.646 1.297 1.04 2.061 1.336.747.304 1.609.514 2.891.575 1.283.061 1.695.075 4.716.075s3.433-.014 4.716-.075c1.282-.061 2.144-.271 2.891-.575.764-.297 1.415-.69 2.061-1.336.646-.646 1.04-1.297 1.336-2.061.304-.747.514-1.609.575-2.891.061-1.283.075-1.695.075-4.716s-.014-3.433-.075-4.716c-.061-1.282-.271-2.144-.575-2.891-.297-.764-.69-1.415-1.336-2.061C21.394 1.339 20.743.946 19.979.65c-.747-.304-1.609-.514-2.891-.575C15.806.014 15.394 0 12.017 0z" />
            </svg>
            Continue with Apple
          </button>

          <button
            onClick={() => handleSocialLogin("phone")}
            className="w-full bg-transparent border border-gray-600 text-white py-3 px-6 rounded-full hover:border-white transition-colors"
          >
            Continue with phone number
          </button>
        </div>

        {/* Email Login Form */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Email or username
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-md focus:border-white focus:outline-none"
            placeholder="Email or username"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-green-500 text-black py-3 px-6 rounded-full font-semibold hover:bg-green-400 transition-colors mb-8"
        >
          Continue
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-gray-400">Don't have an account? </span>
          <button className="text-white underline hover:text-green-500 transition-colors">
            Sign up for Spotify
          </button>
        </div>
      </div>
    </div>
  );
}
