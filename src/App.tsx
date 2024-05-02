import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import UserFeedPage from "./pages/UserFeedPage";
import PostPage from "./pages/PostPage";
import WritePage from "./pages/WritePage";
import SettingPage from "./pages/SettingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SuggestedPage from "./pages/SuggestedPage";
import ChatPage from "./pages/ChatPage";
import DiaryPage from "./pages/DiaryPage";
import DemoApp from "./pages/DiaryPage/DiaryTestPage.tsx";
import LoginPage from "./pages/LoginPage/index.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/userfeed/:userId"} element={<UserFeedPage />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/write"} element={<WritePage />} />
          <Route path={"/edit/:id"} element={<WritePage />} />
          <Route path={"/setting"} element={<SettingPage />} />
          <Route path={"/diary"} element={<DiaryPage />} />
          <Route path={"/"} element={<SuggestedPage />} />
          <Route path={"/chat"} element={<ChatPage />} />
          <Route path={"/test"} element={<DemoApp />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
