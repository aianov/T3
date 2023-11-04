import "./index.css";
import { Main } from "./components/Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { PersonPage } from "./components/PersonPage/PersonPage";

function App() {
  return (
    <SkeletonTheme>
      <BrowserRouter>
        <div className="df aic jcc">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/person" element={<PersonPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
