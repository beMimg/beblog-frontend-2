import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/unauthenticated/SignIn";
import SignUp from "./pages/unauthenticated/SignUp";
import { ThemeProvider } from "./theme/ThemeProvider";
import Posts from "./pages/Posts";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/authenticated/Profile";
import Post from "./pages/Post";
import CreatePost from "./pages/authenticated/CreatePost";

function App() {
  const { accessToken, userInfo } = useAuth();

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* common routes */}
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />

            {!accessToken ? (
              <>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<Profile />} />
                {userInfo?.role === "admin" && (
                  <Route path="/create-post" element={<CreatePost />} />
                )}
              </>
            )}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
