import { Client } from "@stomp/stompjs";

export const client = new Client({
  brokerURL: "ws://localhost:8080/ws/chat",
  // debug: (string) => {
  //   console.log(string);
  // },
  onStompError: (frame) => {
    console.log(frame);
  },
});
