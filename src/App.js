import logo from './logo.svg';
import './App.css';
import Subscription from './Subscription';
import LearningPath from './LearningPath';
import Listpage from './Listpage';
import Blogs from './Blogs';
import Home from './Home';
import Header from './Header';
import TestQuestion from './TestQuestion';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (

	<BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
		  <Route path="/tests" element={<Listpage />} />
          <Route path="/blogs" element={<Blogs />} />
		  <Route path="/addQuestion" element={<Subscription />} />
		  <Route path="/editQuestion" element={<TestQuestion />} />
		  <Route path="/LearningPath" element={<LearningPath />} />
		  
        </Route>
      </Routes>
    </BrowserRouter>
		
	
  );
}

export default App;


