import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CharacterDetail = function () {
  const { id } = useParams();

  const getData = async function (id) {
    try {
      const res = await axios.get(`/character/${id}`);
      console.log(res.data.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  getData(id);
  console.log("들어옴");
  return <div></div>;
};

export default CharacterDetail;
