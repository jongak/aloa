import { useRef, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";
import NoticeList from "./NoticeList";

const getNotice = async function (page) {
  try {
    const res = await axios.get(`/notice/${page}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const AloaNotice = function () {
  const [currentPage, setCurrentPage] = useState(1);
  const [noticeList, setNoticeList] = useState([]);
  const numberOfItems = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNotice(currentPage);

      if (res) {
        setNoticeList(res["data"]);
        numberOfItems.current = res["count"];
      }
    };
    fetchData();
  }, [currentPage]);

  function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
      return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      return range(1, maxLength - sideWidth - 1).concat(
        0,
        range(totalPages - sideWidth + 1, totalPages)
      );
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      return range(1, sideWidth).concat(
        0,
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
    }

    return range(1, sideWidth).concat(
      0,
      range(page - leftWidth, page + rightWidth),
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }

  var limitPerPage = 3; //No. of cards to show per page
  var totalPages = Math.ceil(numberOfItems.current / limitPerPage);
  var paginationSize = 7; //pagination items to show

  function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;

    setCurrentPage(whichPage);
  }
  const handlePageClick = (page) => {
    showPage(page);
  };
  return (
    <>
      {/* <NoticeList /> */}

      <Outlet />
    </>
  );
};

export default AloaNotice;
