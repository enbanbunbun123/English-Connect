import { auth } from "../firebase";
import "../stylesheet/top.scss";
import PostForm from "../components/PostForm";

const Top: React.FC = () => {
  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Top">
        <PostForm />
      </div>
    </>
  );
};

export default Top;
