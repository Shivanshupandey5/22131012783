import React, { useEffect, useState } from "react";
import axios from "axios";

const URLStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/stats");
        setStats(res.data);
      } catch (err) {
        alert("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shortened URL Statistics</h1>
      <ul>
        {stats.map((s, idx) => (
          <li key={idx} className="border-b py-2">
            <p><strong>Short:</strong> {s.shortUrl}</p>
            <p><strong>Clicks:</strong> {s.clicks}</p>
            <p><strong>Created:</strong> {s.createdAt}</p>
            <p><strong>Expires:</strong> {s.expiresAt}</p>
            <p><strong>Click Log:</strong></p>
            <ul className="ml-4 list-disc">
              {s.clicksDetails.map((d, i) => (
                <li key={i}>{d.time} - {d.source} - {d.location}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default URLStats;
