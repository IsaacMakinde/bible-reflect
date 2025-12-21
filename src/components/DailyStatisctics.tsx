import React from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
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

type StatProps = {
  reflections: Reflection[];
};
const DailyStatistics: React.FC<StatProps> = ({ reflections }) => {
  const disgust = reflections.filter(
    (reflection) => reflection.tone === "disgust"
  ).length;

  const disgustPercentage =
    reflections.length === 0
      ? 0
      : Number(((disgust / reflections.length) * 100).toFixed(2));

  const joy = reflections.filter(
    (reflection) => reflection.tone === "joy"
  ).length;

  const joyPercentage =
    reflections.length === 0
      ? 0
      : Number(((joy / reflections.length) * 100).toFixed(2));

  const neutral = reflections.filter(
    (reflection) => reflection.tone === "neutral"
  ).length;

  const neutralPercentage =
    reflections.length === 0
      ? 0
      : Number(((neutral / reflections.length) * 100).toFixed(2));

  const anger = reflections.filter(
    (reflection) => reflection.tone === "anger"
  ).length;

  const angerPercentage =
    reflections.length === 0
      ? 0
      : Number(((anger / reflections.length) * 100).toFixed(2));

  const sadness = reflections.filter(
    (reflection) => reflection.tone === "sadness"
  ).length;

  const sadnessPercentage =
    reflections.length === 0
      ? 0
      : Number(((sadness / reflections.length) * 100).toFixed(2));

  const surprise = reflections.filter(
    (reflection) => reflection.tone === "surprise"
  ).length;

  const surprisePercentage =
    reflections.length === 0
      ? 0
      : Number(((surprise / reflections.length) * 100).toFixed(2));

  const COLORS = [
    "#f59e0b", // joy
    "#38bdf8", // sadness
    "#ef4444", // anger
    "#84cc16", // disgust
    "#8b5cf6", // surprise
    "#9ca3af", // neutral
  ];

  const data = [
    { name: "Joy", value: joy },
    { name: "Sadness", value: sadness },
    { name: "Anger", value: anger },
    { name: "Disgust", value: disgust },
    { name: "Surprise", value: surprise },
    { name: "Neutral", value: neutral },
  ];

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[40rem] border border-gray-300 rounded-3xl shadow-md bg-white p-6 gap-6">
      <h1>Emotion Distribution</h1>
      <p>Click a segment to filter messages</p>

      <div className=" flex flex-col w-full lg:w-10/12 lg:flex-row items-center justify-around  p-4 gap-4">
        <div className="w-full lg:w-1/2 h-64 md:h-96">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius="70%"
                onClick={(data) => console.log(data.name)}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="  text-lime-600 border-gray-400 border-2 gap-2.5 p-4 bg-gray-50 hover:bg-gray-100 items-center rounded-xl flex flex-row">
            <HeartCrack />
            <div className="flex flex-col justify-start text-start p-2">
              <p className="text-lg text-gray-500">Disgust</p>
              <p className="text-lg text-black">
                {" "}
                {disgust}({disgustPercentage}%)
              </p>
            </div>
          </div>
          <div className="  text-violet-600 border-gray-400 border-2 gap-2.5 p-4 bg-gray-50 hover:bg-gray-100 items-center rounded-xl flex flex-row">
            <Sparkles />
            <div className="flex flex-col justify-start text-start p-2">
              <p className="text-lg text-gray-500">Suprise</p>
              <p className="text-lg text-black">
                {surprise}({surprisePercentage}%)
              </p>
            </div>
          </div>
          <div className="  text-sky-600 border-gray-400 border-2 gap-2.5 p-4 bg-gray-50 hover:bg-gray-100 items-center rounded-xl flex flex-row">
            <Droplet />
            <div className="flex flex-col justify-start text-start p-2">
              <p className="terxt-lg text-gray-500">Sadness</p>
              <p className="text-lg text-black">
                {sadness}({sadnessPercentage}%){" "}
              </p>
            </div>
          </div>
          <div className="  text-amber-600 border-gray-400 border-2 gap-2.5 p-4 bg-gray-50 hover:bg-gray-100 items-center rounded-xl flex flex-row">
            <Smile />
            <div className="flex flex-col justify-start text-start p-2">
              <p className="text-lg text-gray-500">Joy</p>
              <p className="text-lg text-black">
                {joy}({joyPercentage}%){" "}
              </p>
            </div>
          </div>
          <div className="  text-red-600 border-gray-400 border-2 gap-2.5 p-4 bg-gray-50 hover:bg-gray-100 items-center rounded-xl flex flex-row">
            <Flame />
            <div className="flex flex-col justify-start text-start p-2 w-12 lg:w-40">
              <p className="text-lg text-gray-500">Anger</p>
              <p className="text-lg text-black">
                {anger}({angerPercentage}%){" "}
              </p>
            </div>
          </div>

          <div className=" text-gray-600 border-gray-400 border-2 gap-2.5 p-4 bg-gray-50 hover:bg-gray-100 items-center rounded-xl flex flex-row">
            <Meh />
            <div className="flex flex-col justify-start text-start p-2">
              <p className="text-lg text-gray-500">Neutral</p>
              <p className="text-lg text-black">
                {neutral}({neutralPercentage}%){" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStatistics;
