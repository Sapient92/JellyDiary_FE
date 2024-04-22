export interface FeedType {
  postId: number;
  isPublic: boolean;
  postImgIsMultiple: boolean;
  postImg: string;
}

export interface feedListType {
  feedListCount: number;
  postList: FeedType[];
}
