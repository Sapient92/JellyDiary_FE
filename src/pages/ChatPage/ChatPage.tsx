import { ChatPageContainer, ChatPageContent } from "./ChatPage.styles.ts";
import ChatPageHeader from "./ChatPageHeader/ChatPageHeader.tsx";
import ChatPageMain from "./ChatPageMain/ChatPageMain.tsx";

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
