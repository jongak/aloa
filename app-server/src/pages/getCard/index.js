import html2canvas from "html2canvas";
import { useRef } from "react";

import axios from "axios";
import saveAs from "file-saver";
import Button from "../../components/common/Button";
import { useParams } from "react-router-dom";
import LootCard from "../../components/common/LootCard";
import { useSelector } from "react-redux";
import ShareCard from "../capture/ShareCard";
import Share from "../capture/Share";

const GetCard = function () {
  const frontRef = useRef("");
  const backRef = useRef("");
  const fullRef = useRef("");
  const { id } = useParams();

  const isHolo = useSelector((state) => state.captureSlice.isHolo);
  const isGlow = useSelector((state) => state.captureSlice.isGlow);
  const isShine = useSelector((state) => state.captureSlice.isShine);
  const isShadow = useSelector((state) => state.captureSlice.isShadow);

  const holographicOptionColors = useRef([
    "#0077be",
    "#0087b3",
    "#0097a8",
    "#00a799",
    "#00b78e",
  ]);
  const shineOptionColors = useRef(["#6dd5ed", "#2193b0"]);
  const shadowOptionColors = useRef([
    "#6dd5ed",
    "#2193b0",
    "#6dd5ed",
    "#2193b0",
  ]);

  const handleFrontDown = async () => {
    const div = frontRef.current;
    const frontCard = await html2canvas(div, { scale: 2 });
    frontCard.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const handleBackDown = async () => {
    const div = backRef.current;
    const backCard = await html2canvas(div, { scale: 2 });
    backCard.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const cardDown = async () => {
    const div = fullRef.current;
    const fullCard = await html2canvas(div, { scale: 2 });
    fullCard.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const copyLinkRef = useRef();

  const copyTextUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  return <Share />;
};
export default GetCard;
