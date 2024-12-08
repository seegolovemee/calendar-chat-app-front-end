// src/hooks/useChat.ts
import { useState } from 'react';
import type { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "你好！我是你的智能助手，有什么我可以帮你的吗？",
      isAgent: true,
      timestamp: new Date(),
    },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessages: Message[] = [
      {
        id: Date.now().toString(),
        text,
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

    setMessages(prev => [...prev, ...newMessages]);
    return newMessages;
  };

  return {
    messages,
    sendMessage,
  };
};