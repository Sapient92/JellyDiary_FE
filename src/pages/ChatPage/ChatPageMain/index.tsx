import ChatPageUserList from "./ChatPageUserList";
import ChatPageChat from "./ChatPageChat";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";

const ChatPageMain = () => {
  return (
    <ChatMainContainer>
      <ChatPageUserList />
      <ChatPageChat />
    </ChatMainContainer>
  );
};

export default ChatPageMain;
