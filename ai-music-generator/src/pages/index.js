import { useState } from "react";

export default function Home() {
  const [music, setMusic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateMusic = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { music } = await response.json();
      setMusic(music);
    } catch (error) {
      console.error("Failed to generate music:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen animate-fadeIn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-10 py-8 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-white text-center">AI Music Generator</h1>
      </header>

      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <div className="w-full max-w-md relative">
          <label htmlFor="promptInput" className={`absolute left-4 transition-all duration-300 ease-in-out ${prompt ? 'text-blue-500 top-0 text-sm' : 'top-1/2 transform -translate-y-1/2'}`}>
            Enter a prompt
          </label>
          <input
            type="text"
            id="promptInput"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder=""
            className="px-4 py-3 text-black bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-colors duration-300 focus:shadow-lg"
          />
        </div>
        <button
          onClick={generateMusic}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0112 16v4zm5.291-6A7.962 7.962 0 0112 20v4c4.418 0 8-3.582 8-8h-4zM16.938 3C15.824 1.135 13.042 0 10 0v4c1.79 0 3.527.684 4.826 1.938L16.937 3z"
                ></path>
              </svg>
              Generating...
            </div>
          ) : (
            "Generate Music"
          )}
        </button>
      </div>

      {music && (
        <div className="w-full max-w-md mt-8">
          <audio className="w-full rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl" controls src={music} />
        </div>
      )}
    </div>
  );
}
