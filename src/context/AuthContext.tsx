import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import constate from "constate";
import { auth } from "../firebase/firebase";

const useAuthState = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    currentUser,
    userLoggedIn: !!currentUser,
    loading,
  };
};

const [AuthProvider, useAuth] = constate(useAuthState);

export { AuthProvider, useAuth };
