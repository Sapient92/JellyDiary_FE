import { create } from 'zustand';

// Define a type for the state
type NotificationState = {
  notificationSetting: boolean;
  postLike: boolean;
  postComment: boolean;
  postCreated: boolean;
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
  notificationSetting: false, // default values
  postLike: false,
  postComment: false,
  postCreated: false,
  commentTag: false,
  newFollower: false,
  dm: false,
  toggleSetting: (key) =>
    set((state) => ({
      ...state,
      [key]: !state[key],
      ...(key === 'notificationSetting' && !state[key]
        ? {
            postLike: false,
            postComment: false,
            postCreated: false,
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
