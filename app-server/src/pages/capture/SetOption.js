import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import ColorToggle from "../../components/common/ColorToggle";
import { useContext, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import AccordionContext from "react-bootstrap/AccordionContext";

const SetOption = function () {
  const {
    holoRef,
    glowRef,
    shineRef,
    shadowRef,
    setIsChanged,
    isChanged,
    holographicOptionColors,
    shineOptionColors,
    shadowOptionColors,
    imgSrcRef,
    holoSrcRef,
    setPage,
  } = useOutletContext();

  useEffect(() => {
    setPage("set");
  }, []);
  // const onChangeToggleRarityPreset = (event) => {
  //   rarityPresetRef.current = event.target.dataset.value;
  //   if (rarityPresetRef.current != "custom") {
  //     holoRef.current = false;
  //     glowRef.current = false;
  //     shineRef.current = false;
  //     shadowRef.current = false;
  //   }
  //   setIsChanged(!isChanged);
  // };

  // const onClickToggleHolo = (event) => {
  //   holoRef.current = !holoRef.current;
  //   if (!holoRef.current) {
  //     glowRef.current = false;
  //     shineRef.current = false;
  //     shadowRef.current = false;
  //   }
  //   rarityPresetRef.current = "custom";
  //   setIsChanged(!isChanged);
  // };

  // const rarityPresets = ["custom", "legendary", "holographic"];
  // const rarityPresetsList = rarityPresets.map((rarityPreset) => {
  //   return (
  //     <Button
  //       isRev={rarityPreset == rarityPresetRef.current}
  //       value={rarityPreset}
  //       key={rarityPreset}
  //       onClick={onChangeToggleRarityPreset}
  //       title={rarityPreset}
  //     />
  //   );
  // });

  return (
    <div className="option-body">
      <h3>03. 카드 효과</h3>
      <Accordion defaultActiveKey={["custom"]} alwaysOpen>
        <Accordion.Item eventKey="custom">
          <Accordion.Header>
            <ToggleButton titleRef={"custom"} title={"Custom"} />
          </Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              {/* <Button
                isRev={holoRef.current}
                onClick={onClickToggleHolo}
                title={"홀로"}
              />

              <Button
                isRev={glowRef.current}
                toggleRef={glowRef}
                // defaltRefs={[rarityPresetRef, holoRef]}
                defaltValues={["custom", true]}
                toggleChanged={isChanged}
                setToggleChanged={setIsChanged}
                title={"글로우"}
              />
              <ColorToggle
                optionColors={shineOptionColors}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />

              <ColorToggle
                optionColors={holographicOptionColors}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />

              <Button
                isRev={shineRef.current}
                toggleRef={shineRef}
                // defaltRefs={[rarityPresetRef]}
                defaltValues={["custom"]}
                toggleChanged={isChanged}
                setToggleChanged={setIsChanged}
                title={"샤인"}
              />

              <Button
                isRev={shadowRef.current}
                toggleRef={shadowRef}
                defaltRefs={[rarityPresetRef]}
                defaltValues={["custom"]}
                toggleChanged={isChanged}
                setToggleChanged={setIsChanged}
                title={"그림자"}
              />
              <ColorToggle
                optionColors={shadowOptionColors}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              /> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="legendary">
          <Accordion.Header>
            <ToggleButton titleRef={"legendary"} title={"Legendary"} />
          </Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="holographic">
          <Accordion.Header>
            <ToggleButton titleRef={"holographic"} title={"Holographic"} />
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
      />
      <br />
      <Button href="../select" title={"이전"} />
      <Button href="../share" title={"이후"} />
    </div>
  );
};
export default SetOption;
