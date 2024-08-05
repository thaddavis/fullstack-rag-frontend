import { createContext, Dispatch } from "react";
import { Action, initialState } from "./ChatSessionReducer";

export const ChatContext = createContext(initialState);
export const ChatDispatchContext = createContext<Dispatch<Action>>(() => null);
