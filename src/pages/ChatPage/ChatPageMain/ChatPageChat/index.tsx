import {
  ChatContainer,
  ChatFlexContainer,
  ChatFooter,
  ChatHeader,
} from "./ChatPageChat.styles.ts";

import sendBtn from "../../../../assets/button/SendBtn.png";

const ChatPageChat = () => {
  return (
    <ChatContainer>
      <ChatFlexContainer>
        <ChatHeader>
          <p>Clementine</p>
        </ChatHeader>
      </ChatFlexContainer>
      <ChatFooter>
        <input type={"text"} placeholder={"대화를 나눠보세요."} />
        <button>
          <img src={sendBtn} alt={"message_send_button"} />
        </button>
      </ChatFooter>
    </ChatContainer>
  );
};

export default ChatPageChat;
