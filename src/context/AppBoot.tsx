import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import React from "react";
const AppBoot = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }

    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 92) {
        value = 92; // cap until real ready
        clearInterval(interval);
      }
      setProgress(Math.floor(value));
    }, 120);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold">OutPour</h1>

        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">Restoring session…</p>
      </div>
    );
  }

  return children;
};

export default AppBoot;
