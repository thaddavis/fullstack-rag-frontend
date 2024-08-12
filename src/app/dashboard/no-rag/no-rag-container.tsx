"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/no-rag/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/no-rag/chat-session-reducer";
import { Chat as StreamingWithMemoryChat } from "@/components/no-rag-chat/chat";
import { useReducer } from "react";

export function NoRagContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <StreamingWithMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
