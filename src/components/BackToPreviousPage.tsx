import "../stylesheet/backToHomeButton.scss";

const BackToPreviousPage = () => {
  const navigateToPreviousPage = () => {
    window.history.back();
  };

  return (
    <>
      <button className="BackToHomeButton" onClick={navigateToPreviousPage}>
        ＜
      </button>
    </>
  );
};

export default BackToPreviousPage;
