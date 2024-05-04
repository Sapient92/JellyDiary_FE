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
