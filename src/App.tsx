import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/unauthenticated/Home";
import SignIn from "./pages/unauthenticated/SignIn";
import SignUp from "./pages/unauthenticated/SignUp";

function App() {
  const accessToken = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!accessToken ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          ) : (
            <Route path="/" element={<p>logged in</p>} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
