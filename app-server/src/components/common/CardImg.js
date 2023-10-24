import "./holofoil.css";

const CardImg = function ({
  divRef,
  bgImgSrc = "https://cdn-lostark.game.onstove.com/uploadfiles/banner/a4bcb45671d44e938c2f7e0efccf7e54.jpg",
}) {
  return (
    <div
      className="cardImg"
      ref={divRef}
      style={{ margin: "100px", width: "600px", height: "800px" }}
    >
      <div
        className="cardBody"
        style={{
          backgroundImage: `url(${bgImgSrc})`,
          backgroundSize: "cover",
          display: "inline-block",
          width: "600px",
          height: "800px",
        }}
      >
        <div
          className="cardTop"
          style={{
            //  backgroundColor: "yellow",
            width: "100%",
            height: "15%",
          }}
        >
          <div> 여기에 이렇게</div>
        </div>
        <div
          className="cardMiddle"
          style={{
            //  backgroundColor: "green",
            width: "100%",
            height: "60%",
          }}
        >
          <div
            className="cardCharacter"
            style={{
              backgroundImage: `url(https://img.lostark.co.kr/armory/0/ab436ac6397b67e6a5f48651c2dc8de9b416ee00d328bbfa6744f348ae55c773.png?v=20230812041304)`,
            }}
          ></div>
        </div>
        <div
          className="cardBottom"
          style={{ backgroundColor: "blue", width: "100%", height: "25%" }}
        ></div>
      </div>
    </div>
  );
};
export default CardImg;
