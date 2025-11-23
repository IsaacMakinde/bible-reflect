import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ currentUser }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { loading, setLoading } = useAuth();

  const onSignOut = async (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);

      await doSignOut();
      navigate("/");
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    console.log(currentUser);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <img
        onClick={() => setOpen(!open)}
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto cursor-pointer"
        src={currentUser.photoURL}
        alt="User avatar"
        aria-haspopup="true"
        aria-expanded={open}
      />

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="avatarButton"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{currentUser.displayName || "User Name"}</div>
            <div className="font-medium truncate">{currentUser.email}</div>
          </div>

          <div className="py-1">
            <a
              onClick={(e) => {
                onSignOut(e);
              }}
              href="#signout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              role="menuitem"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
