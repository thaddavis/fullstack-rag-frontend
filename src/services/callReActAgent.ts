import { Action } from "@/app/dashboard/re-act/chat-session-reducer";
import { nanoid } from "@/lib/utils";
import React from "react";

export async function callReActAgent(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/react-agent/completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
        content: prompt,
      }),
    }
  );

  if (!resp.ok) throw "Network response was not OK";

  const reader = resp?.body?.getReader();

  const decoder = new TextDecoder();

  const aiMessageId = nanoid();
  let accMessage = {
    content: "",
  };

  while (true) {
    // @ts-ignore
    const { done, value } = await reader.read();
    if (done) break;
    let chunk = decoder.decode(value);

    try {
      const parsedChunk = JSON.parse(chunk);
      dispatchEventToState(parsedChunk, dispatch, aiMessageId, accMessage);
    } catch (e) {
      let multiChunkAcc = "";

      let idx = 0;
      while (0 < chunk.length) {
        if (chunk[idx] === "}") {
          try {
            multiChunkAcc += chunk[idx];
            const parsedChunk = JSON.parse(multiChunkAcc);

            dispatchEventToState(
              parsedChunk,
              dispatch,
              aiMessageId,
              accMessage
            );

            chunk = chunk.substring(idx + 1);
            idx = 0;
            multiChunkAcc = "";
          } catch (e) {
            multiChunkAcc += chunk.substring(0, idx);
          }
        } else {
          multiChunkAcc += chunk[idx];
          idx++;
        }
      }
    }
  }
}

function dispatchEventToState(
  parsedChunk: Record<string, string>,
  dispatch: React.Dispatch<Action>,
  aiMessageId: string,
  accMessage: { content: string }
) {
  console.log("EVENT", parsedChunk["event"]);

  if (parsedChunk["event"] === "on_chat_model_start") {
    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: {
    //     id: aiMessageId,
    //     content: "",
    //     role: "ai",
    //     error: null,
    //   },
    // });
  } else if (parsedChunk["event"] === "on_chat_model_stream") {
    accMessage.content += parsedChunk["data"];
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: aiMessageId,
        content: accMessage.content,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_end") {
    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: {
    //     id: aiMessageId,
    //     content: parsedChunk["data"],
    //     role: "ai",
    //     error: null,
    //   },
    // });
  } else if (parsedChunk["event"] === "on_chain_start") {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: aiMessageId,
        content: "",
        role: "ai",
        error: null,
      },
    });
  } else if (parsedChunk["event"] === "on_chain_end") {
    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: {
    //     id: aiMessageId,
    //     content: parsedChunk["data"],
    //     role: "ai",
    //     error: null,
    //   },
    // });
  } else if (parsedChunk["event"] === "on_tool_start") {
    dispatch({
      type: "SET_CURRENT_TOOL",
      payload: parsedChunk["data"],
    });
  } else if (parsedChunk["event"] === "on_tool_end") {
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: aiMessageId,
        content: (accMessage.content += "\n"),
      },
    });
    dispatch({
      type: "SET_CURRENT_TOOL",
      payload: "",
    });
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
