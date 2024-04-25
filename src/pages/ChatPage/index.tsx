import ChatPageHeader from "./ChatPageHeader";
import ChatPageMain from "./ChatPageMain";

import { ChatPageContainer, ChatPageContent } from "./ChatPage.styles.ts";

const ChatPage = () => {
  return (
    <ChatPageContainer>
      <ChatPageContent>
        <ChatPageHeader />
        <ChatPageMain />
      </ChatPageContent>
    </ChatPageContainer>
  );
};

export default ChatPage;
