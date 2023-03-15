import './App.css';
import Header from "./components/header";
import ShowReviews from "./components/show-reviews";
import {Routes, Route} from "react-router-dom";
import ReviewIdAndComments from './components/review-id-wrapper';
import UserSelect from './components/user-select';
import { getUsers } from "./utils/axiosData";
import { useState, useEffect } from "react";

function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    getUsers().then(response => {
        setUsers(response.data.users)
    })
}, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<ShowReviews/>}></Route>
        <Route path="/reviews/:review_id" element={<ReviewIdAndComments users={users}/>}/>
        <Route path="/users" element={<UserSelect users={users}/>}/>
      </Routes>
    </div>
  );
}

export default App;
