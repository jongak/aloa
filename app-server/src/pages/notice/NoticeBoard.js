import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useEffect, useRef, useState } from "react";

import axios from "axios";

const getNotice = async function (page) {
  try {
    const res = await axios.get(`/notice/${page}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const NoticeBoard = function () {
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

  const columns = [
    {
      name: "no",
      selector: (row) => row.no,
      sortable: true,
      maxWidth: "10px",
      center: true,
    },
    {
      name: "version",
      selector: (row) => row.title,
      sortable: true,
      center: 1,
      maxWidth: "10px",
    },
    {
      name: "내용",
      selector: (row) => row.content,
      sortable: true,
      center: 1,
      maxWidth: "20px",
    },
    {
      name: "사진",
      id: "data-table-title",
      selector: (row) => row.image,
      sortable: true,
      maxWidth: "300px",
      center: 1,
    },
    {
      name: "날짜",
      selector: (row) => row.date,
      sortable: true,
      center: 1,
      maxWidth: "40px",
    },
    {
      name: "시간",
      selector: (row) => row.time,
      sortable: true,
      center: 1,
      maxWidth: "40px",
    },
  ];
  const ExpandedComponent = function ({ data }) {
    const detail = JSON.stringify(
      data,
      ["title", "content", "image", "date", "time"],
      2
    );
    return (
      <form>
        <div>
          <textarea
            value={detail}
            // onChange={(e) => setArticle(e.target.value)}
            style={{ width: "100%", height: "200px" }}
          ></textarea>
        </div>
        <button type="submit">수정</button>
      </form>
    );
  };
  return (
    <div>
      <h1>Temp</h1>

      <div className="data-table">
        <div>
          <DataTable
            columns={columns}
            data={noticeList}
            defaultSortFieldID={1}
            pagination
            // paginationComponent={showPage}
            // selectableRows
            expandOnRowClicked
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            responsive
            // subHeader
            // subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
