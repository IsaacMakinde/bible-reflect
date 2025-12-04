import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";
import logo from "../assets/igm_logo.png";
const Header = () => {
  const { currentUser, userLoggedIn } = useAuth();
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <image href="../assets/igm_logo.png"></image>
          <img
            src={logo}
            className="rounded-full border-2 border-sky-500 hover:scale-110 transition:ease-in duration-300 h-20 w-20"
          ></img>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                  Projects{" "}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!userLoggedIn ? (
              <div className="sm:flex sm:gap-4">
                <Link
                  to={"/login"}
                  className="block rounded-md bg-rose-200 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-red-100"
                >
                  Login
                </Link>

                <Link
                  to={"/register"}
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-sky-500 sm:block"
                  href="#"
                >
                  Register
                </Link>
              </div>
            ) : (
              <UserDropdown currentUser={currentUser}></UserDropdown>
            )}

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
