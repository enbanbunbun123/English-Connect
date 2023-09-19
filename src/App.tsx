import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PostForm from "./pages/PostForm";
import ItemDetail from "./pages/ItemDetail";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user && <Header />}
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
