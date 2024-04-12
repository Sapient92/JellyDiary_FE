import { ChatMainContainer } from "./ChatPageMain.styles.ts";
import ChatPageUserList from "./ChatPageUserList/ChatPageUserList.tsx";
import ChatPageChat from "./ChatPageChat/ChatPageChat.tsx";

const ChatPageMain = () => {
  return (
    <ChatMainContainer>
      <ChatPageUserList />
      <ChatPageChat />
    </ChatMainContainer>
  );
};

export default ChatPageMain;
