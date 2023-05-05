import { createContext, useContext, useReducer, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

type User = {
  uid: string;
  displayName: string;
  photoURL: string;
};

type Chat = {
  date: number;
  lastMessage: {
    text: string;
    timestamp: number;
  };
  userInfo: User;
};

type ChatState = {
  chatId: string;
  user: User;
};

type ChatAction = {
  type: string;
  payload: any;
};

type ChatContextType = {
  data: ChatState;
  dispatch: ({ type, payload }: ChatAction) => void;
};

type ChatContextProviderProps = {
  children: ReactNode;
};

export const ChatContext = createContext<ChatContextType>(null!);

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE: ChatState = {
    chatId: "null",
    user: {
      uid: "",
      displayName: "",
      photoURL: "",
    },
  };

  const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        const user = action.payload;
        const chatId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        return {
          user,
          chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
