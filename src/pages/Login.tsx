import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import IconButton from "../components/buttons/IconButton";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  if (userLoggedIn) return <Navigate to="/" replace />;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleError = (err: any) => {
    const messages: any = {
      "auth/wrong-password": "Invalid email or password",
      "auth/invalid-email": "Invalid email or password",
      "auth/user-disabled": "Your account has been disabled. Contact support.",
      "auth/user-not-found": "No account found with that email",
      "auth/email-already-in-use": "Email already in use",
    };
    setErrorMessage(messages[err.code] || "Login failed. Try again.");
    console.error(err.message);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (isSigningIn) return;

    setIsSigningIn(true);
    setErrorMessage("");

    try {
      await doSignInWithEmailAndPassword(formData.email, formData.password);
    } catch (err) {
      handleError(err);
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    try {
      await doSignInWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="py-16">
      <form onSubmit={onSubmit} className="space-y-5 max-w-4xl mx-auto">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden lg:block lg:w-1/2 bg-cover bg-center bg-[url(https://w.wallhaven.cc/full/l3/wallhaven-l3y1xq.png)]"></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Brand
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>

            {/* Google Sign In */}
            <div className="mt-4">
              <IconButton
                type="google"
                onClick={onGoogleSignIn}
                className="text-gray-700"
                disabled={isSigningIn}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-gray-500 uppercase">
                or login with email
              </span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-200 text-gray-700 border rounded py-2 px-4 w-full focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Password */}
            <div className="mt-4 w-full max-w-sm">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative w-full">
                <input
                  name="password"
                  className="bg-gray-200 text-gray-700 border rounded py-2 pr-10 px-4 w-full focus:outline-none focus:shadow-outline"
                  type={isHidden ? "password" : "text"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setIsHidden(!isHidden)}
                >
                  {isHidden ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 font-bold mt-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className="cursor-pointer mt-8 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 font-bold"
            >
              {isSigningIn ? "Logging In..." : "Login"}
            </button>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                to="/register"
                className="text-xs underline text-gray-500 uppercase"
              >
                or sign up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
