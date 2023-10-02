import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PostForm from "./pages/PostForm";
import ItemDetail from "./pages/ItemDetail";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ranking from "./pages/Ranking";
import SignIn from "./pages/SignIn";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-form" element={<PostForm />} />
          <Route path="/item-detail/:id" element={<ItemDetail />} />
          <Route path="/my-page/:userId" element={<MyPage />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
