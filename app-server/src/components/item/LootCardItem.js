import LootCard from "../common/LootCard";

const LootCardItem = function (props) {
  const { img } = props;
  const rarityPreset = "hologram";
  const holoSrc = "http://localhost:4400/api/images/wave.png";
  const holo = true;
  const glow = true;
  const shine = true;
  const shadow = true;
  const holographicOptionColors = [
    "#0077be",
    "#0087b3",
    "#0097a8",
    "#00a799",
    "#00b78e",
  ];
  const shineOptionColors = ["#6dd5ed", "#2193b0"];
  const shadowOptionColors = ["#6dd5ed", "#2193b0", "#6dd5ed", "#2193b0"];

  return (
    <LootCard
      rarityPreset={rarityPreset}
      img={img}
      holo={holoSrc}
      holographicOptions={
        holo
          ? {
              glow: glow,
              color1: holographicOptionColors[0],
              color2: holographicOptionColors[1],
              color3: holographicOptionColors[2],
              color4: holographicOptionColors[3],
              color5: holographicOptionColors[4],
            }
          : null
      }
      shineOptions={
        shine
          ? {
              color1: shineOptionColors[0],
              color2: shineOptionColors[1],
            }
          : null
      }
      shadowOptions={
        shadow
          ? {
              default: {
                color1: shadowOptionColors[0],
                color2: shadowOptionColors[1],
              },
              hover: {
                color1: shadowOptionColors[2],
                color2: shadowOptionColors[3],
              },
            }
          : null
      }
      size={{ height: 400, width: 300 }}
    />
  );
};
export default LootCardItem;
