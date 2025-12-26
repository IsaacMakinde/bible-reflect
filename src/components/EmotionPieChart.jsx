import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#f59e0b", // joy
  "#38bdf8", // sadness
  "#ef4444", // anger
  "#84cc16", // disgust
  "#8b5cf6", // surprise
  "#9ca3af", // neutral
];

export default function EmotionPieChart({ data, onSliceClick }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            onClick={(data) => {
              console.log(data.name);
              onSliceClick(data.name);
            }}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
