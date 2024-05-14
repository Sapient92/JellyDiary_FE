import {
  ChatUserSearchContainer,
  SearchBtn,
} from "./ChatPageUserSearch.styles.ts";
import React, { useState } from "react";

const ChatPageUserSearch = () => {
  const [userName, setUserName] = useState("");

  const changeSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <ChatUserSearchContainer>
      <input
        type={"text"}
        value={userName}
        onChange={changeSearchUser}
        placeholder={"사용자, 다이어리 검색..."}
      />
      <SearchBtn />
    </ChatUserSearchContainer>
  );
};

export default ChatPageUserSearch;
