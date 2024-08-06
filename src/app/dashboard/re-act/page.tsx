"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/re-act/ChatSessionContext";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/re-act/ChatSessionReducer";
import { Chat as ReActChat } from "@/components/re-act-chat/chat";
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
          <ReActChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </ProtectedRoute>
  );
}
