import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import UserFeedPage from "./pages/UserFeedPage/UserFeedPage.tsx";
import PostPage from "./pages/PostPage/PostPage.tsx";
function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path={"/userfeed"} element={<UserFeedPage />} />
          <Route path={"/post"} element={<PostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
