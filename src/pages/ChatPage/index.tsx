import { ChatPageContainer, ChatPageContent } from "./ChatPage.styles.ts";
import ChatPageHeader from "./ChatPageHeader";
import ChatPageMain from "./ChatPageMain";

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
