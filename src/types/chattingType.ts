export interface ChatType {
  chatMessagePreview: string;
  chatRoomId: number;
  chatRoomName: string;
  chatRoomProfileImg: null | string;
  createdAt: null | string;
  diaryId: null | number;
  userId: null | number;
}

export interface MessageListType {
  chatMessage: string;
  chatMessageId: number;
  chatRoomId: string;
  createdAt: string;
  userId: string;
  userName: string;
  userProfileImg: null | string;
}

export interface MessageType {
  chatMessageList: MessageListType[];
  hasNext: boolean;
  hasPrevious: boolean;
}
