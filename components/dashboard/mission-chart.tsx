"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "S1", avancement: 12 },
  { name: "S2", avancement: 28 },
  { name: "S3", avancement: 46 },
  { name: "S4", avancement: 63 },
  { name: "S5", avancement: 78 }
];

export function MissionChart() {
  return (
    <div className="card p-4 h-80">
      <h3 className="font-semibold mb-4">Avancement global de la mission</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="avancement" stroke="#0EA5E9" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
