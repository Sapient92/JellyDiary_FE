export interface FeedType {
  postId: number;
  isPublic: boolean;
  postImgIsMultiple: boolean;
  postImg: string;
}

export interface FeedPostType {
  count: number;
  feeds: FeedType[];
}

export interface FollowType {
  profileImg: string | null;
  userDesc: string | null;
  userId: number;
  userName: string;
  followStatus: boolean;
}
