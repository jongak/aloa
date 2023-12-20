import axios from "axios";
import AdminListItem from "./AdminListItem";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getData = async function (no) {
  try {
    const res = await axios.get(`/images/list/${no}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const AdminList = function () {
  var { no } = useParams();
  no = Number(no);
  const [cardList, setCardList] = useState([]);
  const is_manager = useSelector((state) => state.loginSlice.is_manager);
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(0);
  const paginationSize = 7;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(no);
      if (res) {
        setCardList(res["data"]);
        setTotalPages(res["maxNo"]);
      }
    };

    fetchData();
  }, [no]); // id가 변경될 때마다 useEffect를 실행

  function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
      if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
        throw new Error("Invalid range");
      }
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
      return range(0, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      return range(0, maxLength - sideWidth - 1).concat(
        -1,
        range(totalPages - sideWidth + 1, totalPages)
      );
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      return range(0, sideWidth).concat(
        -1,
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
    }

    return range(0, sideWidth).concat(
      -1,
      range(page - leftWidth, page + rightWidth),
      -1,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }

  function showPage(whichPage) {
    if (whichPage < 0 || whichPage > totalPages) return false;

    navigate(`/adminlist/${whichPage}`);
  }
  const handlePageClick = (page) => {
    showPage(page);
  };

  if (!is_manager) {
    navigate("/404");
  }
  return (
    <div className="main-banner container">
      <div className="row justify-content-around">
        {cardList.map((character_id) => (
          <AdminListItem
            key={"item" + character_id}
            character_id={character_id}
          />
        ))}
      </div>
      <div className="pagination">
        <ul className="pagination-list">
          <li
            className={`page-item previous-page ${no === 1 ? "disable" : ""}`}
            onClick={() => handlePageClick(no - 1)}
          >
            <Link className="page-link">Prev</Link>
          </li>
          {getPageList(totalPages, no, paginationSize).map((item, index) => {
            return (
              <li
                key={index}
                className={`page-item ${item ? "current-page" : "dots"} ${
                  item == no ? "active" : ""
                }`}
                onClick={() => showPage(item)}
              >
                <Link className="page-link">{item == -1 ? "..." : item}</Link>
              </li>
            );
          })}
          <li
            className={`page-item next-page ${
              no === totalPages ? "disable" : ""
            }`}
            onClick={() => handlePageClick(no + 1)}
          >
            <Link className="page-link">Next</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminList;
