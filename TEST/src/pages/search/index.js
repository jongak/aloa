import axios from "axios";
import { useRef } from "react";
axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
import LootCard from "../../components/layout/LootCard";
import img from "../../img/result_5.png";
const Search = function () {
  return (
    <LootCard
      // img={
      //   "https://assets.pokemon.com/assets/cms2/img/cards/web/SV3PT5/SV3PT5_EN_200.png"
      // }
      img={img}
      shineOptions={{
        color1: "#6dd5ed",
        color2: "#2193b0",
      }}
      holographicOptions={{
        glow: true,
        color1: "#0077be",
        color2: "#0087b3",
        color3: "#0097a8",
        color4: "#00a799",
        color5: "#00b78e",
      }}
      shadowOptions={{
        default: { color1: "#6dd5ed", color2: "#2193b0" },
        hover: { color1: "#6dd5ed", color2: "#2193b0" },
      }}
      size={{ height: 410, width: 300 }}
    />
  );
};
export default Search;
