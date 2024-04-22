export interface DiaryType {
  postTitle: string;
  postDate: string;
  createdAt: string;
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
