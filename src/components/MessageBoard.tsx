import React from "react";
import { User } from "lucide-react";
import {
  Trash2,
  Clock,
  Smile,
  Sparkles,
  Droplet,
  Flame,
  HeartCrack,
  Meh,
} from "lucide-react";
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

  const emotionColorMap: any = {
    anger: {
      bg: "bg-gradient-to-r from-red-50 to-red-100",
      border: "border-l-10 border-red-200",
      icon: Flame,
      color: "text-red-600",
    },
    joy: {
      bg: "bg-gradient-to-r from-amber-50 to-amber-100",
      border: "border-l-10 border-amber-200",
      icon: Smile,
      color: "text-amber-600",
    },
    sadness: {
      bg: "bg-gradient-to-r from-sky-50 to-sky-100",
      border: " border-l-10 border-sky-200",
      icon: Droplet,
      color: "text-sky-600",
    },
    surprise: {
      bg: "bg-gradient-to-r from-violet-50 to-violet-100",
      border: "border-l-10 border-violet-200",
      icon: Sparkles,
      color: "text-violet-600",
    },
    disgust: {
      bg: "bg-gradient-to-r from-lime-50 to-lime-100",
      border: "border-l-10 border-lime-200",
      icon: HeartCrack,
      color: "text-lime-600",
    },
    neutral: {
      bg: "bg-white",
      border: "border-l-10 border-gray-200",
      icon: Meh,
      color: "text-gray-600",
    },
  };

  const EmotionConfig = emotionColorMap[reflect.tone];
  const EmotionIcon = EmotionConfig.icon;
  return (
    <div
      className={`flex p-4 flex-col h-auto min-h-40 border border-y-gray-200 shadow-xs shadow-gray-50 rounded-2xl ${EmotionConfig.bg} ${EmotionConfig.border} `}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <div
          className={`flex flex-row justify-center items-center text-sm ${EmotionConfig.color} gap-2`}
        >
          <User className="text-gray-900" />
          <p className="text-gray-900">{reflect.user_name}</p>
          <EmotionIcon />
        </div>

        <div className="flex flex-row justify-center items-center gap-5">
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
