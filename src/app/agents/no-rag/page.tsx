"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/agents/no-rag/ChatContext";
import { chatReducer, initialState } from "@/app/agents/no-rag/ChatReducer";
import { Chat as StreamingChat } from "@/components/streaming-chat/chat";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <StreamingChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </>
  );
}
