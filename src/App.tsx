import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-form" element={<PostForm />} />
      </Routes>
    </div>
  );
};

export default App;
