import { createContext, Dispatch } from "react";
import { Action, initialState } from "./ChatReducer";

export const ChatContext = createContext(initialState);
export const ChatDispatchContext = createContext<Dispatch<Action>>(() => null);
