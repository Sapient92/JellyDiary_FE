import { ChatUserListContainer } from "./ChatPageUserList.styles.ts";
import ChatPageUserSearch from "./ChatPageUserSearch";

const ChatPageUserList = () => {
  return (
    <ChatUserListContainer>
      <ChatPageUserSearch />
    </ChatUserListContainer>
  );
};

export default ChatPageUserList;
