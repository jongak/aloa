import { useNavigate } from "react-router";
import hasing from "../../store/hasing";
import { toast } from "react-toastify";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { signin } from "../../store/loginSlice";
import Button from "../../components/common/Button";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginIdRef = useRef();
  const loginPwRef = useRef();
  const loginNameRef = useRef();

  const isDark = useSelector((state) => state.mainSlice.isDark);
  const thema = useSelector((state) => state.mainSlice.thema);
  const is_signed = useSelector((state) => state.loginSlice.is_signed);

  const signUp = useCallback(async () => {
    const loginId = loginIdRef.current.value;
    const loginPw = loginPwRef.current.value;
    const loginName = loginNameRef.current.value;

    if (!loginId.trim()) {
      toast.error("아이디를 입력해주세요");
      return;
    }
    if (!loginPw.trim()) {
      toast.error("비밀번호를 입력해주세요");
      return;
    }
    if (!loginName.trim()) {
      toast.error("이름을 입력해주세요");
      return;
    }

    try {
      const res = await axios.post("/login/up", {
        login_id: loginId,
        password: await hasing(loginId + loginPw),
        name: loginName,
      });

      if (res.data.ok) {
        toast.success("회원가입 성공!");
        signin({
          newUser: { name: res.data.name, is_manager: res.data.role },
        });
        navigate("/");
        return;
      } else if (res.data.message == "중복아이디") {
        toast.error("아이디를 사용할 수 없습니다.");
      }
    } catch (error) {
      toast.error("서버에 문제가 생겼습니다. 잠시후 다시 시도해주세요.");
    }
  }, [dispatch, navigate]);

  return (
    <div className="main-banner container">
      <div className="row justify-content-center">
        <div className="login-container">
          <div className="logo">
            {isDark == "dark" ? (
              <>
                <img
                  src={`/assets/images/logo/logo_mark_mycolor${thema}.png`}
                />
                <img src={`/assets/images/logo/logo_name_${isDark}.png`} />
              </>
            ) : (
              <>
                <img src={`/assets/images/logo/logo_mark_${isDark}.png`} />
                <img src={`/assets/images/logo/logo_name_${isDark}.png`} />
              </>
            )}
          </div>
          <div className="form-outline">
            <input
              type="text"
              className="form-control"
              placeholder="아이디"
              ref={loginIdRef}
            />
          </div>
          <div className="form-outline">
            <input
              type="password"
              className="form-control"
              placeholder="비밀번호"
              ref={loginPwRef}
            />
          </div>
          <div className="form-outline">
            <input
              type="text"
              className="form-control"
              placeholder="이름"
              ref={loginNameRef}
            />
          </div>
          <br />
          <br />
          <Button title={"회원가입"} onClick={signUp} />
          <br /> <br />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
