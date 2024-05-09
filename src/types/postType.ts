export interface WriteInputType {
  postTitle: string;
  postDate: string;
  postContent: string;
  isPublic: boolean;
  weather: string | null;
  meal: string | null;
  snack: string | null;
  water: string | null;
  walk: string | null;
  toiletRecord: string | null;
  shower: string | null;
  weight: string | null;
  specialNote: string | null;
}

export interface PostImgsType {
  postImgs: File[] | null;
}

interface BeforeImgsProps {
  diaryPostImg: string;
  imgId: number;
}

export interface PostType {
  createdAt: string;
  commentCount: number;
  diaryId: number;
  isDelete: boolean;
  isPublic: boolean;
  likeCount: number;
  meal: null | string;
  modifiedAt: null | string;
  postContent: string;
  postDate: string;
  postId: number;
  postImgs: BeforeImgsProps[] | null;
  postTitle: string | null;
  shower: null | string;
  snack: null | string;
  specialNote: null | string;
  toiletRecord: null | string;
  userId: number;
  walk: null;
  water: null | string;
  weather: null | string;
  weight: null | string;
}
