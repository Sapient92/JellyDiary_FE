import { Client } from "@stomp/stompjs";

export const client = new Client({
  brokerURL: "wss://jellydiary.life/ws/chat'",
  debug: (string) => {
    console.log(string);
  },
  onStompError: (frame) => {
    console.log(frame);
  },
});
