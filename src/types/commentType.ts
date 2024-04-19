export interface CommentType {
  commentContent: string;
  commentId: number;
  createdAt: string;
  isDelete: boolean;
  userId: number;
  userName: string;
  userProfileImg: string;
  userTag: object[];
}
