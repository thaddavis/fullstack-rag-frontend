"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/agents/streaming/ChatContext";
import { chatReducer, initialState } from "@/app/agents/streaming/ChatReducer";
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
