import { useState } from "react";
import { detectTone } from "../utils/detectTone";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Send } from "lucide-react";
import { LoaderCircle } from "lucide-react";

type ReflectProps = {
  addReflection(trimmed: String, tone: String, word_count: number): void;
};
const ReflectionForm: React.FC<ReflectProps> = ({ addReflection }) => {
  const [text, setText] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const { userLoggedIn } = useAuth();

  const handleSubmit = async (e: any) => {
    console.log("addReflection prop:", addReflection);
    console.log("Cotent");
    setWaitingForResponse(true);
    e.preventDefault();
    const trimmed = text.trim();
    const word_count = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    try {
      const tone = await detectTone(trimmed);
      console.log(trimmed, tone);
      await addReflection(trimmed, tone, word_count);
    } catch (error) {
      console.log(error);
    } finally {
      setWaitingForResponse(false);
      setText("");
      return;
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      className="flex flex-col h-auto  w-full space-y-4 rounded-2xl border border-2 border-sky-500 p-6 "
    >
      <div className="flex flex-col gap-4">
        <label className="block text-sm font-medium text-gray-900">
          {" "}
          Reflections
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={8}
          className="w-full p-3  text-left rounded-2xl border border-2 border-stone-300 resize-none focus:outline-none "
        />
      </div>
      {!waitingForResponse ? (
        <button
          className="flex justify-self-end justify-between items-center self-end rounded-2xl h-10 bg-sky-500 px-4 gap-4 py-3 text-md font-medium text-black transition-colors  hover:text-gray-400 hover:bg-red-100 disabled:cursor-not-allowed disabled:hover:text-black"
          type="submit"
          disabled={!userLoggedIn}
        >
          <Send />
          <p>Post Message</p>
        </button>
      ) : (
        <button
          type="button"
          className="flex justify-self-end justify-between items-center self-end rounded-2xl h-10 bg-sky-500 px-4 gap-4 py-3 text-md font-medium text-black transition-colors  hover:text-gray-400 hover:bg-red-100 disabled:cursor-not-allowed disabled:hover:text-black"
          disabled
        >
          <LoaderCircle className="animate-spin" /> Processing...
        </button>
      )}
    </form>
  );
};

export default ReflectionForm;
