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
  return (
    <>
      <div className="main-banner container">
        <div className="row justify-content-center">
          <div className="option-area col-lg-10 col-md-10">
            <div className="progress">
              <div className="inner notice_title">
                <h3>공지 사항</h3>
              </div>
            </div>
            <div className="option-body notice">
              <div className="userRow">
                <div className="userbody">
                  <a
                    href="https://www.notion.so/ALOA-2-0-92a59fa7fc9649d88f3cfc8a4782de17"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      style={{}}
                      src="/assets/images/icons/notion_logo.png"
                      alt="Notion Logo"
                      className="notion-logo"
                    />
                    <span>ALOA 2.0 공지사항 바로가기</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeList;
