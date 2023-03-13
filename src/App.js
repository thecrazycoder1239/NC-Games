import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReviewId from "./review-id"

function App() {
  return (
    <div className="App">
      <h1>NC-Games</h1>
      <Routes>
        <Route path="/:review_id" element={<ReviewId />}/>
      </Routes>
    </div>
  );
}

export default App;
