// src/components/chat/ChatSidebar.tsx
import React, { useState, useEffect, useRef } from "react";
import { X, MoreHorizontal, Send } from "lucide-react";
import type { Message } from "../../types";

interface ChatSidebarProps {
  onClose: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ onClose }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "你好！我是你的智能助手，有什么我可以帮你的吗？",
      isAgent: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // 添加这个 useEffect
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages: Message[] = [
      {
        id: Date.now().toString(),
        text: inputMessage,
        isAgent: false,
        timestamp: new Date(),
      },
      {
        id: (Date.now() + 1).toString(),
        text: "收到你的消息，我来帮你处理这个问题。",
        isAgent: true,
        timestamp: new Date(),
      },
    ];

    setMessages((prev) => [...prev, ...newMessages]);
    setInputMessage("");
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* 聊天头部 */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Agent Name</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 消息列表 */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isAgent ? "justify-start" : "justify-end"
            }`}
          >
            {message.isAgent && (
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex-shrink-0" />
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg break-words whitespace-pre-wrap ${
                message.isAgent ? "bg-gray-100" : "bg-green-400 text-white"
              }`}
            >
              <div className="break-all">{message.text}</div>
            </div>
            {!message.isAgent && (
              <div className="w-8 h-8 bg-gray-200 rounded-full ml-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
