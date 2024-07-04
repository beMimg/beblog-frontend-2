import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/unauthenticated/SignIn";
import SignUp from "./pages/unauthenticated/SignUp";
import { ThemeProvider } from "./theme/ThemeProvider";
import Posts from "./pages/Posts";

function App() {
  const accessToken = false;

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<Layout />}>
            {!accessToken ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/posts" element={<Posts />} />
              </>
            ) : (
              <Route path="/" element={<p>logged in</p>} />
            )}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
