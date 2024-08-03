"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/agents/react/ChatSessionContext";
import {
  chatReducer,
  initialState,
} from "@/app/agents/react/ChatSessionReducer";
import { Chat as ReActChat } from "@/components/react-chat/chat";
import { nanoid } from "@/lib/utils";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  const sessionId = nanoid(8);

  return (
    <>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <ReActChat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </>
  );
}
