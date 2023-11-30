import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsThemaOpen } from "../../store/mainSlice";
import { ToastContainer } from "react-toastify";

function Layout() {
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const thema = useSelector((state) => state.mainSlice.thema);
  const dispatch = useDispatch();
  return (
    <div
      className={`App ${isDark} a${thema}`}
      onClick={() => {
        dispatch(setIsThemaOpen({ newIsThemaOpen: true }));
      }}
    >
      <Header />
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={6000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        // closeOnClick={true} // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss={false} // 화면을 벗어나면 알람 정지
        draggable={false} // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
