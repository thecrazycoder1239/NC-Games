import './App.css';
import Header from "./components/header";
import ShowReviews from "./components/show-reviews";
import {Routes, Route} from "react-router-dom";
import ReviewId from "./components/review-id";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<ShowReviews/>}></Route>
        <Route path="/reviews/:review_id" element={<ReviewId />}/>
      </Routes>
    </div>
  );
}

export default App;
