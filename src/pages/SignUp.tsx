import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { passwordMatch } from "../utils/validator";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!isRegistering) {
      const validation = passwordMatch(password, confirmPassword);
      if (!validation.match) {
        setErrorMessage(validation.reason || "Invalid input");
        return;
      }

      setIsRegistering(true);
      setErrorMessage("");
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to create account");
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="py-16">
      <form onSubmit={onSubmit} className="space-y-5">
        {userLoggedIn && <Navigate to={"/"} replace={true} />}
        <div className="flex bg-white outline-solid outline-pink-300 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover bg-center bg-[url(https://w.wallhaven.cc/full/l3/wallhaven-l3y1xq.png)]"></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Brand
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Let's get started!
            </p>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>

              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <div className="relative w-full max-w-sm">
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type={isHidden ? "password" : "text"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
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
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                required
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
                disabled={isRegistering}
              >
                {isRegistering ? "Signing up..." : "Sign Up"}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to={"/login"} className="text-xs text-gray-500 uppercase">
                Already have an account?{" "}
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
