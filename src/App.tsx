import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  const accessToken = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {!accessToken ? (
            <Route path="/" element={<p>lol</p>} />
          ) : (
            <Route path="/" element={<p>logged in</p>} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
