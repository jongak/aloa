import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import domtoimage from "dom-to-image";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import LootCard from "../../components/common/LootCard";
import saveAs from "file-saver";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/front/${id}`);
    return res.data.error;
  } catch (err) {
    console.error(err);
  }
};

const aloaNotice = function () {
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visibleItems, setVisibleItems] = useState([]);

  const noticeItem = [
    { no: 1, title: "악추피 추가", content: "악추피가 추가되었습니다." },
    {
      no: 2,
      title: "악추피 입력이 추가되었습니다.",
      content:
        "카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명 '악추피'가 추가되었습니다.<br>악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아 이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드 전면에 보여집니다.",
    },
    {
      no: 3,
      title: "악추피 입력이 추가되었습니다.",
      content:
        "카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명 '악추피'가 추가되었습니다.<br>악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아 이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드 전면에 보여집니다.",
    },
    {
      no: 4,
      title: "악추피 입력이 추가되었습니다.",
      content:
        "카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명 '악추피'가 추가되었습니다.<br>악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아 이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드 전면에 보여집니다.",
    },
    {
      no: 5,
      title: "악추피 입력이 추가되었습니다.",
      content:
        "카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명 '악추피'가 추가되었습니다.<br>악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아 이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드 전면에 보여집니다.",
    },
    {
      no: 6,
      title: "악추피 입력이 추가되었습니다.",
      content:
        "카드 앞면에 보여지는 스탯에 악마 대상 추가 데미지 일명 '악추피'가 추가되었습니다.<br>악추피는 로스트 아크 공식 홈페이지에서 제공해주지 않아 이용하실 분께서는 수치를 직접입력해 주시면 해당 값이 카드 전면에 보여집니다.",
    },
  ];

  const limitPerPage = 3;

  useEffect(() => {
    const numberOfItems = noticeItem.length;
    const totalPages = Math.ceil(numberOfItems / limitPerPage);
    setTotalPages(totalPages);
    showPage(1);
  }, []); // 최초 로드 시 한 번만 실행

  const showPage = (whichPage) => {
    if (whichPage < 1 || whichPage > totalPages) return false;

    setCurrentPage(whichPage);

    const startIdx = (whichPage - 1) * limitPerPage;
    const endIdx = whichPage * limitPerPage;

    setVisibleItems(noticeItem.slice(startIdx, endIdx));

    return true;
  };
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
  return (
    <>
      <div className="main-banner container">
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
      </div>

      <div className="main-banner container">
        <div className="row justify-content-center">
          <div className="option-area col-lg-10 col-md-10">
            <div className="progress">
              <div className="inner notice_title">
                <h3 style={{ color: "var(--my--dark-heading)" }}>공지 사항</h3>
              </div>
            </div>
            <div className="option-body">
              <Accordion defaultActiveKey={"1"}>
                {noticeItem.map((item) => {
                  <Accordion.Item eventKey={item.no}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>
                      <div className="board_item">
                        <div className="board_details">
                          <div className="content">
                            <p>{item.content}</p>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>;
                })}
              </Accordion>
            </div>
            <div className="pagination">
              <li className="page-item previous-page disable">
                <a className="page-link" href="#">
                  Prev
                </a>
              </li>
              <li className="page-item current-page active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item dots">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item current-page">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item current-page">
                <a className="page-link" href="#">
                  6
                </a>
              </li>
              <li className="page-item dots">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item current-page">
                <a className="page-link" href="#">
                  10
                </a>
              </li>
              <li className="page-item next-page">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default aloaNotice;
