import ChatPageHeader from "./ChatPageHeader";
import ChatPageMain from "./ChatPageMain";

import { ChatPageContainer, ChatPageContent } from "./ChatPage.styles.ts";
import { useParams } from "react-router-dom";
import { CreateChatRoom } from "../../utils/StompClient.ts";

const ChatPage = () => {
  const { userId } = useParams();
  const roomId = CreateChatRoom(undefined, userId);

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
