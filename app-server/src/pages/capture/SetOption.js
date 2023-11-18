import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import ColorToggle from "../../components/common/ColorToggle";
import { useContext, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import { useDispatch, useSelector } from "react-redux";
import {
  setFrameColor,
  setFramePreset,
  setRarityPreset,
} from "../../store/captureSlice";

const SetOption = function () {
  const {
    setIsChanged,
    isChanged,
    holographicOptionColors,
    shineOptionColors,
    shadowOptionColors,
    imgSrcRef,
    holoSrcRef,
    setPage,
    characterNameRef,
  } = useOutletContext();
  const rarityPreset = useSelector((state) => state.captureSlice.rarityPreset);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("set");
  }, []);

  return (
    <div className="option-body set">
      <h3>03. 카드 효과</h3>

      <Accordion defaultActiveKey={["select", "color"]} alwaysOpen>
        <Accordion.Item eventKey="select">
          <Accordion.Header>카드 테두리</Accordion.Header>
          <Accordion.Body>
            <div
              className="userRow"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "20px",
                padding: "20px",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((i) => {
                return (
                  <div
                    key={`aa${i}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundImage: `url('/assets/images/card_frame/${i}/0.png')`,
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      dispatch(setFramePreset({ newFramePreset: i }));
                      setIsChanged(!isChanged);
                    }}
                  ></div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="color">
          <Accordion.Header>카드 색상</Accordion.Header>
          <Accordion.Body>
            <div
              className="userRow"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "20px",
                padding: "20px",
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => {
                return (
                  <div
                    key={`${i}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundImage: `url('/assets/images/card_frame/color/${i}.png')`,
                      cursor: "pointer",
                      marginRight: "10px",
                      backgroundSize: "cover",
                    }}
                    onClick={() => {
                      dispatch(setFrameColor({ newFrameColor: i }));
                      setIsChanged(!isChanged);
                    }}
                  ></div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion
        defaultActiveKey={["custom"]}
        onSelect={(eventKey) => {
          if (eventKey[0]) {
            dispatch(
              setRarityPreset({
                newRarityPreset: eventKey[0],
              })
            );
          }
        }}
        activeKey={rarityPreset}
        alwaysOpen
      >
        <Accordion.Item eventKey="custom">
          <Accordion.Header>
            <ToggleButton titleRef={"custom"} title={"Custom"} />
          </Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <ToggleButton
                titleRef={"isHolo"}
                title={"홀로그램"}
                body={"반짝이는 효과를 설정합니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
              <ToggleButton
                titleRef={"isGlow"}
                title={"글로우"}
                body={"움직임에 따라 반짝이는 효과를 설정합니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />

              <ColorToggle
                optionColors={holographicOptionColors}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
                titleRef={"isGlow"}
              />

              <ToggleButton
                titleRef={"isShine"}
                title={"샤인"}
                body={"빛나는 효과를 설정합니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
              <ColorToggle
                optionColors={shineOptionColors}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
                titleRef={"isShine"}
              />

              <ToggleButton
                titleRef={"isShadow"}
                title={"그림자"}
                body={"그림자를 설정합니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />

              <ColorToggle
                optionColors={shadowOptionColors}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
                titleRef={"isShadow"}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="legendary">
          <Accordion.Header>
            <ToggleButton
              eventKey="legendary"
              titleRef={"legendary"}
              title={"Legendary"}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
            />
          </Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="holographic">
          <Accordion.Header>
            <ToggleButton
              eventKey="holographic"
              titleRef={"holographic"}
              title={"Holographic"}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
            />
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Button href="../select" title={"이전"} />
      <Button href="../share" title={"다음"} />
    </div>
  );
};
export default SetOption;
