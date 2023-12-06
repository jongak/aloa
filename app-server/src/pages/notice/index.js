import { useRef, useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";

const getNotice = async function (page) {
  try {
    const res = await axios.get(`/notice/notice/${page}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const getCount = async function () {
  try {
    const res = await axios.get("/notice/total");
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
const total = await getCount();
console.log(total);

const aloaNotice = function () {
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNotice(currentPage);
      console.log(res);
      if (res) {
        setNoticeList(res);
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

  var numberOfItems = 5;
  var limitPerPage = 3; //No. of cards to show per page
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
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
      {/* <div className="main-banner container">
        <div className="row justify-content-center">
          <div className="option-area col-lg-10 col-md-10">
            <div className="progress">
              <div className="inner notice_title">
                <h3 style={{ color: "var(--my--dark-heading)" }}>공지 사항</h3>
              </div>
            </div>
            <div className="option-body notice_box">
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <div>
                    <img
                      className="notice_dot"
                      src={`/assets/images/logo/logo_mark_${isDark}.png`}
                    />
                    <span>23.11.30.</span>
                    <span>15:53</span>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h1>악추피 입력이 추가되었습니다.</h1>
                    <p>
                      카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명
                      &lsquo;악추피&lsquo;가 추가되었습니다.
                      <br />
                      악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아
                      이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드
                      전면에 보여집니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="main-banner container">
        <div className="row justify-content-center">
          <div className="option-area col-lg-10 col-md-10">
            <div className="progress">
              <div className="inner notice_title">
                <h3 style={{ color: "var(--my--dark-heading)" }}>공지 사항</h3>
              </div>
            </div>
            <div className="option-body">
              <Accordion defaultActiveKey={1}>
                {noticeList.map((item) => (
                  <Accordion.Item key={item.no} eventKey={item.no}>
                    <Accordion.Header>
                      {item.title}
                      <div style={{ marginLeft: "20px", fontSize: "16px" }}>
                        {item.date} {item.time}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="board_item">
                        <div className="board_details">
                          <div className="content">
                            <p
                              style={{ margin: "0 auto", paddingLeft: "40px" }}
                            >
                              <span style={{ textAlign: "left" }}>
                                {item.content}
                              </span>
                              <br />
                            </p>
                            {/* {item.img.map((line, index) => (
                              <img
                                key={index}
                                src={line}
                                style={{
                                  width: "90%",
                                  border: "1px solid #000",
                                  marginTop: "20px",
                                }}
                              />
                            ))} */}
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
    </>
  );
};

export default aloaNotice;
