"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/rag/ChatSessionContext";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/rag/ChatSessionReducer";
import { Chat as RagChat } from "@/components/rag-chat/chat";
import ProtectedRoute from "@/components/shared/protected-route";
import { nanoid } from "@/lib/utils";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  const sessionId = nanoid(8);

  return (
    <ProtectedRoute>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <RagChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </ProtectedRoute>
  );
}
