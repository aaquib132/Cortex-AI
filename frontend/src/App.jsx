import React, { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import Loading from "./Loading";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post("https://cortex-ai-backend-haz2.onrender.com/ask", { prompt });
      if (res.data.status) {
        const aiMessage = {
          role: "ai",
          content: res.data.answer,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-[#0f0f14] to-[#1a1a24] text-white flex flex-col">
      

      <header className="p-5 border-b border-white/10 text-center">
        <h1 className="text-3xl font-bold tracking-wide">
          Cortex <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Your AI-powered thinking companion
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20 opacity-0 animate-fadeIn">
            Unlock insights. Ask Cortex AI anything.
          </div>
        )}


        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-3xl ${
              msg.role === "user" ? "ml-auto text-right" : "mr-auto"
            }`}
          >
            <div
              className={`inline-block px-5 py-4 rounded-2xl leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-[#1f1f2b] text-gray-200 rounded-bl-none"
              }`}
            >
              <Markdown>{msg.content}</Markdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="max-w-3xl mr-auto">
            <div className="inline-block px-4 py-3 rounded-2xl bg-[#1f1f2b]">
              <Loading />
            </div>
          </div>
        )}
      </main>


      <div className="p-4 border-t border-white/10 bg-[#0f0f14]">
        <div className="max-w-4xl mx-auto flex gap-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Cortex AI anything..."
            rows="1"
            className="flex-1 resize-none rounded-xl bg-[#1f1f2b] px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 overflow-hidden"
            style={{ height: "auto" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition px-6 rounded-xl font-semibold"
          >
            Send
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-2">
          Press <b>Enter</b> to send • <b>Shift + Enter</b> for new line
        </p>
      </div>
    </div>
  );
};

export default App;
