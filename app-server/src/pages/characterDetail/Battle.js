const Battle = function () {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-6">
          <div
            className="col"
            style={{
              border: "solid 1px black",
              height: "10vh",
              backgroundColor: "white",
            }}
          >
            아이템 레벨, 전투
          </div>
          <div
            className="col"
            style={{
              border: "solid 1px black",
              height: "25vh",
              backgroundColor: "white",
            }}
          >
            특화 치명 신속
          </div>
        </div>
        <div
          className="col-6"
          style={{ height: "35vh", backgroundColor: "white" }}
        >
          어떤 사진
        </div>
      </div>
      <div className="row" style={{ marginTop: "10px" }}>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "60vh",
            backgroundColor: "white",
          }}
        >
          현재 착용 장비
        </div>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "30vh",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          보석
        </div>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "30vh",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          카드
        </div>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "60vh",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          스킬
        </div>
      </div>
    </div>
  );
};

export default Battle;
