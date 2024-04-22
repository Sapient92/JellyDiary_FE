export interface feedType {
  postId: number;
  isPublic: boolean;
  postImgIsMultiple: boolean;
  postImg: string;
}

export interface feedListType {
  feedListCount: number;
  postList: feedType[];
}
