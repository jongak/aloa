import { useOutletContext } from "react-router";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { useEffect, useRef, useState, version } from "react";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";

const NoticeBoard = function () {
  const { noticeList } = useOutletContext();
  const is_manager = useSelector((state) => state.loginSlice.is_manager);
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
      maxWidth: "200px",
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
      sortable: false,
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
    const [article, setArticle] = useState(detail);

    const updateHandler = async function (e) {
      e.preventDefault();
      const index = data.no;
      const result = await axios.put(
        `/notice/fix/${index}`,
        JSON.parse(article)
      );
      // console.log(result.data);
      setArticle(result.data);
    };
    return (
      <form onSubmit={updateHandler}>
        <div>
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            style={{ width: "100%", height: "200px" }}
          ></textarea>
        </div>
        <button type="submit">수정</button>
      </form>
    );
  };
  // notice 추가하기
  const versionRef = useRef("");
  const contentRef = useRef("");
  const imageRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const createToggle = async function () {
    const version = versionRef.current.value;
    const content = contentRef.current.value;
    const image = imageRef.current.value;
    const date = dateRef.current.value;
    const time = timeRef.current.value;
    // console.log(version, content, image, date, time);
    try {
      const res = await axios.post("/notice/new", {
        title: version,
        content: content,
        image: image,
        date: date,
        time: time,
      });
      // console.log({
      //   title: version,
      //   content: content,
      //   image: image,
      //   date: date,
      //   time: time,
      // });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        justifyContent: "center",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "16px",
        fontWeight: "700",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "16px",
      },
    },
  };

  if (!is_manager) {
    return;
  }
  return (
    <div>
      <h1>Temp</h1>

      <div className="data-table">
        <div>
          <DataTable
            columns={columns}
            data={noticeList}
            defaultSortFieldID={1}
            // pagination
            // paginationComponent={showPage}
            // selectableRows
            expandOnRowClicked
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            responsive
            customStyles={customStyles}
            // subHeader
            // subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>

      <Accordion>
        <Accordion.Item>
          <Accordion.Header>추가하기</Accordion.Header>
          <Accordion.Body>
            <div className="board_item">
              <div className="board_details">
                <div className="content">
                  <form className="board_setting">
                    <div>
                      <input
                        type="text"
                        ref={versionRef}
                        placeholder="version"
                      />
                    </div>
                    <div>
                      <textarea
                        type="text"
                        ref={contentRef}
                        placeholder="내용"
                      />
                    </div>
                    <div>
                      <textarea type="text" ref={imageRef} placeholder="사진" />
                    </div>
                    <div>
                      <input type="text" ref={dateRef} placeholder="날짜" />
                    </div>
                    <div>
                      <input type="text" ref={timeRef} placeholder="시간" />
                    </div>
                    <Button onClick={createToggle} title={"추가"} />
                  </form>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default NoticeBoard;
