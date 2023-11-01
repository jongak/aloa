import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import ColorToggle from "../../components/common/ColorToggle";

const SetOption = function () {
  const {
    rarityPresetRef,
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

  setPage("set");
  const onChangeToggleRarityPreset = (event) => {
    rarityPresetRef.current = event.target.dataset.value;
    if (rarityPresetRef.current != "custom") {
      holoRef.current = false;
      glowRef.current = false;
      shineRef.current = false;
      shadowRef.current = false;
    }
    setIsChanged(!isChanged);
  };

  const onClickToggleHolo = (event) => {
    holoRef.current = !holoRef.current;
    if (!holoRef.current) {
      glowRef.current = false;
      shineRef.current = false;
      shadowRef.current = false;
    }
    rarityPresetRef.current = "custom";
    setIsChanged(!isChanged);
  };

  const rarityPresets = ["custom", "legendary", "holographic"];
  const rarityPresetsList = rarityPresets.map((rarityPreset) => {
    return (
      <Button
        isRev={rarityPreset == rarityPresetRef.current}
        value={rarityPreset}
        key={rarityPreset}
        onClick={onChangeToggleRarityPreset}
        title={rarityPreset}
      />
    );
  });

  return (
    <>
      {rarityPresetsList}
      <Button
        isRev={holoRef.current}
        onClick={onClickToggleHolo}
        title={"홀로"}
      />

      <Button
        isRev={glowRef.current}
        toggleRef={glowRef}
        defaltRefs={[rarityPresetRef, holoRef]}
        defaltValues={["custom", true]}
        toggleChanged={isChanged}
        setToggleChanged={setIsChanged}
        title={"글로우"}
      />
      <ColorToggle
        optionColors={holographicOptionColors}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />

      <Button
        isRev={shineRef.current}
        toggleRef={shineRef}
        defaltRefs={[rarityPresetRef]}
        defaltValues={["custom"]}
        toggleChanged={isChanged}
        setToggleChanged={setIsChanged}
        title={"샤인"}
      />
      <ColorToggle
        optionColors={shineOptionColors}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
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
      />

      <input
        type="text"
        className="form-control"
        ref={imgSrcRef}
        onBlur={() => {
          setIsChanged(!isChanged);
        }}
        defaultValue={imgSrcRef.current.value}
      />
      <input
        type="text"
        className="form-control"
        ref={holoSrcRef}
        onBlur={async () => {
          setIsChanged(!isChanged);
        }}
        defaultValue={holoSrcRef.current.value}
      />
      <Button href="../select" title={"이전"} />
      <Button href="../share" title={"이후"} />
    </>
  );
};
export default SetOption;
