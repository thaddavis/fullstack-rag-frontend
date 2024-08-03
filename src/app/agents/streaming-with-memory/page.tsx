"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/agents/streaming-with-memory/ChatSessionContext";
import {
  chatReducer,
  initialState,
} from "@/app/agents/streaming-with-memory/ChatSessionReducer";
import { Chat as StreamingWithMemoryChat } from "@/components/streaming-with-memory-chat/chat";
import { nanoid } from "@/lib/utils";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  const sessionId = nanoid(8);

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
