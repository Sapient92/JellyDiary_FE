import { create } from 'zustand';

// Define a type for the state
type NotificationState = {
  notificationSetting: boolean;
  subscribe: boolean;
  postLike: boolean;
  postComment: boolean;
  post: boolean;
  diary: boolean;
  commentTag: boolean;
  newFollower: boolean;
  dm: boolean;
};

// Define a type for the actions
type NotificationActions = {
  toggleSetting: (key: keyof NotificationState) => void;
  initializeState: (initialState: NotificationState) => void;
};

// Combine the state and actions into a single type
type UseNotificationStore = NotificationState & NotificationActions;

// Create the store
export const useNotificationStore = create<UseNotificationStore>((set) => ({
  notificationSetting: true,
  subscribe: true,
  postLike: true,
  postComment: true,
  post: true,
  diary: true,
  commentTag: true,
  newFollower: true,
  dm: true,
  toggleSetting: (key) =>
    set((state) => ({
      ...state,
      [key]: !state[key],
      ...(key === 'notificationSetting' && !state[key]
        ? {
            subscribe: false,
            postLike: false,
            postComment: false,
            post: false,
            diary: false,
            commentTag: false,
            newFollower: false,
            dm: false,
          }
        : {}),
    })),
  initializeState: (initialState) =>
    set(() => ({
      ...initialState,
    })),
}));
