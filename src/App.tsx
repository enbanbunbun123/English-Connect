import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm";
import ItemDetail from "./pages/ItemDetail";
import MyPage from "./pages/MyPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/item-detail/:id" element={<ItemDetail />} />
        <Route path="/my-page/:userId" element={<MyPage />} />
      </Routes>
    </div>
  );
};

export default App;
