"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/agents/completion/ChatContext";
import { chatReducer, initialState } from "@/app/agents/completion/ChatReducer";
import { Chat } from "@/components/completion-chat/chat";
import { useReducer } from "react";

export default function Page() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <>
      <ChatContext.Provider value={chat}>
        <ChatDispatchContext.Provider value={dispatch}>
          <Chat />
        </ChatDispatchContext.Provider>
      </ChatContext.Provider>
    </>
  );
}
