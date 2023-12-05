import { useNavigate } from "react-router";
import hasing from "../../store/hasing";
import { toast } from "react-toastify";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { signin } from "../../store/loginSlice";
import Button from "../../components/common/Button";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginIdRef = useRef();
  const loginPwRef = useRef();

  const isDark = useSelector((state) => state.mainSlice.isDark);
  const thema = useSelector((state) => state.mainSlice.thema);

  const signIn = useCallback(async () => {
    const loginId = loginIdRef.current.value;
    const loginPw = loginPwRef.current.value;

    if (!loginId.trim()) {
      toast.error("아이디를 입력해주세요");
      return;
    }
    if (!loginPw.trim()) {
      toast.error("비밀번호를 입력해주세요");
      return;
    }

    try {
      const res = await axios.post("/login/", {
        login_id: loginId,
        password: await hasing(loginId + loginPw),
      });

      if (res.data.ok) {
        toast.success("로그인 성공!");
        dispatch(
          signin({
            newUser: { name: res.data.name, is_manager: res.data.role },
          })
        );
        navigate("/");
        return;
      } else {
        toast.error("아이디 또는 비밀번호를 다시 확인해주세요.");
      }
    } catch (error) {
      toast.error("서버에 문제가 생겼습니다. 잠시후 다시 시도해주세요.");
    }
  }, [dispatch, navigate]);

  const ingToggle = function () {
    toast.error("서비스 준비예정입니다.");
  };

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

          <div className="row mb-1 mt-4">
            <div className="col d-flex justify-content-center">
              <div className="text-center">
                <p>
                  비밀번호를 잊으셨나요? &nbsp;&nbsp;
                  <Link onClick={ingToggle}>비밀번호 찾기</Link>
                </p>
              </div>
            </div>
          </div>

          <Button title={"로그인"} onClick={signIn} />

          <div className="row mb-4 mt-1">
            <div className="col d-flex justify-content-center">
              <div className="text-center">
                <p>
                  회원이 아니신가요? &nbsp; <Link to="/signup">회원가입</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
