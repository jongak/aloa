const Statistics = function () {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col"
          style={{
            backgroundColor: "white",
            height: "60vh",
            border: "solid 1px black",
            margin: "10px 10px 5px 10px",
          }}
        >
          아이템 레벨
        </div>
      </div>
      <div className="row">
        <div
          className="col"
          style={{
            backgroundColor: "white",
            height: "60vh",
            border: "solid 1px black",
            margin: "5px 10px 10px 10px",
          }}
        >
          원정대 레벨
        </div>
      </div>
    </div>
  );
};

export default Statistics;
