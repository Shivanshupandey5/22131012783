import React, { useState } from "react";
import axios from "axios";

const URLShortener = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addInput = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/shorten", { urls });
      setResults(res.data);
    } catch (err) {
      alert("Error: " + err.response?.data?.message || err.message);
    }
 };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      {urls.map((url, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Original URL"
            value={url.longUrl}
            onChange={(e) => handleChange(index, "longUrl", e.target.value)}
            className="border p-2 w-full mb-1"
          />
        <input
            type="number"
            placeholder="Validity (minutes)"
            value={url.validity}
            onChange={(e) => handleChange(index, "validity", e.target.value)}
            className="border p-2 w-full mb-1"
          />
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={url.shortcode}
            onChange={(e) => handleChange(index, "shortcode", e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      ))}
 <button onClick={addInput} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Add More
      </button>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
        Shorten URLs
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Shortened URLs</h2>
          <ul>
            {results.map((res, idx) => (
              <li key={idx} className="border-b py-2">
                <strong>{res.shortUrl}</strong> (expires in {res.validity} min)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default URLShortener;
