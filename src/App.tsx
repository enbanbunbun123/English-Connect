import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm";
import ItemDetail from "./pages/ItemDetail";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/item-detail/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  );
};

export default App;
