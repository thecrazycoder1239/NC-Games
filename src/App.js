import './App.css';
import Header from "./components/header";
import ShowReviews from "./components/show-reviews";
import {Routes, Route} from "react-router-dom";
import ReviewIdAndComments from './components/review-id-wrapper';
import UserSelect from './components/user-select';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<ShowReviews/>}></Route>
        <Route path="/reviews/:review_id" element={<ReviewIdAndComments />}/>
        <Route path="/users" element={<UserSelect/>}/>
      </Routes>
    </div>
  );
}

export default App;
