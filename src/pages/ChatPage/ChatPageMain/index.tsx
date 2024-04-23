import { ChatMainContainer } from "./ChatPageMain.styles.ts";
import ChatPageUserList from "./ChatPageUserList";
import ChatPageChat from "./ChatPageChat";

const ChatPageMain = () => {
  return (
    <ChatMainContainer>
      <ChatPageUserList />
      <ChatPageChat />
    </ChatMainContainer>
  );
};

export default ChatPageMain;
