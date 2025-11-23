import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import constate from "constate";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuthState = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoggedIn(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { currentUser, userLoggedIn, loading, setLoading };
};

const [AuthProvider, useAuth] = constate(useAuthState);

export { AuthProvider, useAuth };
