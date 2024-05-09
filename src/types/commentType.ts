export interface CommentType {
  commentContent: string;
  commentId: number;
  createdAt: string;
  userId: number;
  replyCount: number;
  userName: string;
  userProfileImg: string;
  userTag: object[];
}
