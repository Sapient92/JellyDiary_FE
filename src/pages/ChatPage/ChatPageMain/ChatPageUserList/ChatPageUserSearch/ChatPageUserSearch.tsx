import {
  ChatUserSearchContainer,
  SearchBtn,
} from "./ChatPageUserSearch.styles.ts";

const ChatPageUserSearch = () => {
  return (
    <ChatUserSearchContainer>
      <input type={"text"} placeholder={"사용자, 다이어리 검색..."} />
      <SearchBtn />
    </ChatUserSearchContainer>
  );
};

export default ChatPageUserSearch;
