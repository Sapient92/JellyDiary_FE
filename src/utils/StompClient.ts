import { Client } from "@stomp/stompjs";

// const useCreateChatRoom = async (diaryId?: string, userId?: string) => {
//   const [chatId, setChatId] = useState<number | null>(null);
//   useEffect(() => {
//     async function createRoom() {
//       try {
//         const response = diaryId
//           ? await api.post("/api/chat/room", {
//               diaryId: diaryId,
//               chatRoomType: "GROUP",
//             })
//           : await api.post("/api/chat/room", {
//               userId: userId,
//               chatRoomType: "PRIVATE",
//             });
//         setChatId(response.data.data);
//       } catch (e) {
//         console.error("채팅방 생성 실패: ", e);
//       }
//     }
//     if (diaryId || userId) {
//       createRoom();
//     }
//   }, [diaryId, userId]);
//   return chatId;
// };
//
// export default useCreateChatRoom;

export const client = new Client({
  brokerURL: "ws://localhost:8080/ws/chat",
  debug: (string) => {
    console.log(string);
  },
  onStompError: (frame) => {
    console.log(frame);
  },
});
