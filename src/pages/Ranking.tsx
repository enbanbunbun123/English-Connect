import BackToHomeButton from "../components/BackToHomeButton";
import "../stylesheet/ranking.scss";

const Ranking: React.FC = () => {
  return (
    <>
      <div className="Ranking">
        <BackToHomeButton />
        <div className="Ranking__contents">
          <div className="Ranking__contents__title">ランキング</div>
        </div>
      </div>
    </>
  );
};

export default Ranking;
