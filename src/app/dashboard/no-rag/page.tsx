"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/no-rag/ChatSessionContext";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/no-rag/ChatSessionReducer";
import { Chat as StreamingWithMemoryChat } from "@/components/no-rag-chat/chat";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <StreamingWithMemoryChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </>
  );
}
