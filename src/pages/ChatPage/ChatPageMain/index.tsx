import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ChatPageChat from "./ChatPageChat";
import ChatPageUserList from "./ChatPageUserList";

import { useFetchLoginUser } from "../../../hooks/useLoginUser.ts";
import { useUserStore } from "../../../store/userStore/userStore.ts";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";

const ChatPageMain: React.FC = () => {
  const { userId, diaryId } = useParams();
  const { data } = useFetchLoginUser();
  const setLoginUserId = useUserStore((state) => state.setLoginUserId);

  useEffect(() => {
    if (data) {
      setLoginUserId(data?.userId);
    }
  }, [data]);

  return (
    <ChatMainContainer>
      <ChatPageUserList />
      {(userId || diaryId) && <ChatPageChat />}
    </ChatMainContainer>
  );
};

export default ChatPageMain;
