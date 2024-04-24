import ChatPageUserSearch from "./ChatPageUserSearch";

import { ChatUserListContainer } from "./ChatPageUserList.styles.ts";

const ChatPageUserList = () => {
  return (
    <ChatUserListContainer>
      <ChatPageUserSearch />
    </ChatUserListContainer>
  );
};

export default ChatPageUserList;
