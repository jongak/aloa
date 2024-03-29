import { useRef, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";
import { useSelector } from "react-redux";

const getNotice = async function (page) {
  try {
    const res = await axios.get(`/notice/list/${page}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const NoticeList = function () {
  const is_manager = useSelector((state) => state.loginSlice.is_manager);

  const [currentPage, setCurrentPage] = useState(1);
  const [noticeList, setNoticeList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
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
  }, [currentPage, isChanged]);

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
      <div className="main-banner container">
        <div className="row justify-content-center">
          <div className="option-area col-lg-10 col-md-10">
            <div className="progress">
              <div className="inner notice_title">
                <h3>공지 사항</h3>
                <span className={is_manager ? "" : "isMenu"}>
                  <Link to="/notice/setting">
                    <i className="fa fa-gear"></i>
                  </Link>
                </span>
              </div>
            </div>
            <div className="option-body">
              <Accordion defaultActiveKey={["eee", 0]}>
                <Accordion.Item eventKey={"eee"}>
                  <Accordion.Header>긴급공지</Accordion.Header>
                  <Accordion.Body>
                    <div className="board_item">
                      <div className="board_details">
                        <div className="content">
                          <p style={{ textAlign: "left" }}>
                            지금 서버 접속자가 많아서 카드저장이 안됩니다..
                          </p>
                          <br />
                          <p style={{ textAlign: "left" }}>
                            특히 아래 사진이 안보인다면, 이미지 서버가 아예
                            먹통인거에요
                          </p>
                          <br />
                          <img
                            src={
                              process.env.REACT_APP_API_SERVER +
                              "/images/front/abcd123456789"
                            }
                            style={{ width: "80%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {noticeList.map((item, index) => (
                  <Accordion.Item key={"accitem" + item["no"]} eventKey={index}>
                    <Accordion.Header>
                      {item["title"]}
                      <div style={{ marginLeft: "20px", fontSize: "16px" }}>
                        {item["date"]} {item["time"]}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="board_item">
                        <div className="board_details">
                          <div className="content">
                            {item["content"]
                              .split("\n")
                              .map((element, index) => (
                                <p
                                  key={"contentitem" + index}
                                  style={{ textAlign: "left" }}
                                >
                                  - {element}
                                </p>
                              ))}
                            <br />
                            {item["image"]
                              ? item["image"]
                                  .split("\n")
                                  .map((element, index) => (
                                    <img
                                      key={"contentimg" + index}
                                      src={`${process.env.REACT_APP_API_SERVER}/notice/img/${element}`}
                                      style={{ widht: "80%" }}
                                    ></img>
                                  ))
                              : ""}
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            <div className="pagination">
              <ul className="pagination-list">
                <li
                  className={`page-item previous-page ${
                    currentPage === 1 ? "disable" : ""
                  }`}
                  onClick={() => handlePageClick(currentPage - 1)}
                >
                  <Link className="page-link">Prev</Link>
                </li>
                {getPageList(totalPages, currentPage, paginationSize).map(
                  (item, index) => (
                    <li
                      key={index}
                      className={`page-item ${item ? "current-page" : "dots"} ${
                        item === currentPage ? "active" : ""
                      }`}
                      onClick={() => showPage(item)}
                    >
                      <Link className="page-link">{item || "..."}</Link>
                    </li>
                  )
                )}
                <li
                  className={`page-item next-page ${
                    currentPage === totalPages ? "disable" : ""
                  }`}
                  onClick={() => handlePageClick(currentPage + 1)}
                >
                  <Link className="page-link">Next</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Outlet context={{ noticeList, setIsChanged, isChanged }} />
    </>
  );
};

export default NoticeList;
