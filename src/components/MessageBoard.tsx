import React from "react";
import { User } from "lucide-react";
import { Trash2, Clock } from "lucide-react";
import { Reflection } from "../types/reflection";
import { useAuth } from "../context/AuthContext";
type MessageProps = {
  reflect: Reflection;
  deleteFunc(id: number): void;
};

const MessageBoard: React.FC<MessageProps> = ({ reflect, deleteFunc }) => {
  const { currentUser, userLoggedIn } = useAuth();
  const formatTime = (date: string) => {
    const old = new Date(date);
    const now = new Date();
    const diff = now.getTime() - old.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return old.toLocaleDateString();
  };
  return (
    <div className="flex p-4 flex-col bg-white h-auto min-h-40 border border-gray-200  shadow-xs shadow-gray-50 rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <div className="flex flex-row justify-center items-center text-sm gap-2">
          <User />
          {reflect.user_name}
        </div>

        <div className="flex flex-row justify-center items-center gap-5 bg-white">
          <div className="flex flex-row text-gray-500 gap-1">
            <Clock /> <span>{formatTime(reflect.updated_at)}</span>
          </div>

          {userLoggedIn && currentUser?.uid === reflect.user_id && (
            <div className="flex p-2 text-red-500 hover:text-black">
              <Trash2 onClick={() => deleteFunc(reflect.id)} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" /> {/* Spacer pushes next element down */}
      <p className="self-start text-left ">{reflect.content}</p>
    </div>
  );
};

export default MessageBoard;
