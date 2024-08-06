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
import ProtectedRoute from "@/components/shared/protected-route";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ProtectedRoute>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <StreamingWithMemoryChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </ProtectedRoute>
  );
}
