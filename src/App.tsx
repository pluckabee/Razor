import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import "./App.css";
import { SearchView } from "./views/SearchView";

import "./App.css";
import { SingleTitleView } from "./views/SingleTitleView";
import { ReviewProvider } from "./providers/ReviewsProvider";

function App() {
  return (
    <ReviewProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SearchView/>} />
            <Route path="/movie/:imdbID" element={<SingleTitleView/>} />
          </Routes>
        </div>
      </Router>
    </ReviewProvider>
  );
}

export default App;
