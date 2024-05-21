import './App.css';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import UserFeedPage from './pages/UserFeedPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import SettingPage from './pages/SettingPage/index.tsx';
import NotFoundPage from './pages/NotFoundPage';
import SuggestedPage from './pages/SuggestedPage';
import ChatPage from './pages/ChatPage';
import DiaryPage from './pages/DiaryPage';
import DemoApp from './pages/DiaryPage/DiaryTestPage.tsx';
import LoginPage from './pages/LoginPage/index.tsx';
import SignInPage from './pages/LoginPage/SigninPage/index.tsx';
import DiaryEditPage from './pages/DiaryPage/DiaryEditPage/index.tsx';
import MainPage from './pages/MainPage/index.tsx';
import PrivateRoute from './auth/PrivateRoute.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/signin'} element={<SignInPage />} />

          <Route
            path={'/userfeed/:userId'}
            element={
              <PrivateRoute>
                <UserFeedPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/post/:id'}
            element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/write/:diaryId'}
            element={
              <PrivateRoute>
                <WritePage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/edit/:id'}
            element={
              <PrivateRoute>
                <WritePage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/setting'}
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/diary/:id'}
            element={
              <PrivateRoute>
                <DiaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/diary'}
            element={
              <PrivateRoute>
                <DiaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/diary/edit/:id'}
            element={
              <PrivateRoute>
                <DiaryEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/sns'}
            element={
              <PrivateRoute>
                <SuggestedPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/chat'}
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/chat/:userId'}
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/chat/group/:diaryId'}
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path={'/test'}
            element={
              <PrivateRoute>
                <DemoApp />
              </PrivateRoute>
            }
          />
          <Route path={'*'} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
