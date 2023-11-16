import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import ColorToggle from "../../components/common/ColorToggle";
import { useContext, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import { useDispatch, useSelector } from "react-redux";
import { setRarityPreset } from "../../store/captureSlice";

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
  } = useOutletContext();
  const dispatch = useDispatch();
  const rarityPreset = useSelector((state) => state.captureSlice.rarityPreset);
  useEffect(() => {
    setPage("set");
  }, []);

  return (
    <div className="option-body set">
      <h3>03. 카드 효과</h3>

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
              />
              <ToggleButton
                titleRef={"isGlow"}
                title={"글로우"}
                body={"움직임에 따라 반짝이는 효과를 설정합니다."}
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
            />
          </Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="holographic">
          <Accordion.Header>
            <ToggleButton
              eventKey="holographic"
              titleRef={"holographic"}
              title={"Holographic"}
            />
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>

      {/* <input
        type="text"
        className="form-control"
        // ref={imgSrcRef}
        onBlur={(e) => {
          imgSrcRef.current = e.target.value;
          setIsChanged(!isChanged);
        }}
        defaultValue={imgSrcRef.current}
      />
      <input
        type="text"
        className="form-control"
        // ref={holoSrcRef}
        onBlur={async (e) => {
          holoSrcRef.current = e.target.value;
          setIsChanged(!isChanged);
        }}
        defaultValue={holoSrcRef.current}
      /> */}
      <Button href="../select" title={"이전"} />
      <Button href="../share" title={"다음"} />
    </div>
  );
};
export default SetOption;
