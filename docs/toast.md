### toast

알림창은 홈페이지 구성에 거의 필수적이라 할수있다.  
특히 이전에만들었던 lacaT와, 이번에 만드는 aloa에선 단계별 진행이 있고, 그단계중  
일부분이 실패할 가능성이 있고, 어느정도 단계에선 사용자에게 정보를 급하게 알려줄 필요가 있을것이다.

기본 브라우저 알림창이 있다.

> window.alert([message]);

이것이 그것인데 기본적인 알림창 역할을 하곤있지만, css를 이용할수 없어 디자인 일관성이 깨지게 된다.

### locaT

locaT에선 bootstrap - toast를 이용하여 직접 만드는 방식을 썻다.

```
...
  const [popText, setPopText] = useState("");

  const alertHandler = function (title) {
    setPopText(title);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return(
    ...
     <PopUp body={popText} isActive={isActive} />
     ...
  )
...

```

```
import styles from "./popup.module.css";

const PopUp = function (props) {
  return (
    <div
      className={
        props.isActive
          ? `toast toast-3s fade show ${styles.toastPosition}`
          : `toast toast-3s fade hide ${styles.toastPosition}`
      }
      role="alert"
      aria-live="assertive"
      data-delay="2000"
      aria-atomic="true"
    >
      <div className="toast-header" style={{ backgroundColor: "#22b3c1" }}>
        <img
          src="/assets/images/logo2.png"
          alt=""
          className={`img-fluid m-r-5 ${styles.logoStyle}`}
        />
        <strong className="mr-auto"></strong>
        <small className="text-muted"></small>
      </div>
      <div className="toast-body">
        <strong className="mr-auto">{props.body}</strong>
      </div>
    </div>
  );
};
export default PopUp;

```

이런식으로 팝업창을 새로 컴포넌트로 만들어 놓고, useState를 이용해 필요할때 등장,  
3초뒤에 일괄적으로 껏다.

이때 생긴 문제점으로는

- 위치조정을 하지 못했다. (아마 fix로 해놓고 화면에서 위치를 고정 시켜놓았으면 됬을꺼 같기도한데, 그당시엔 생각을 못했다.)
- 컴포넌트와 함수를 계속 써야만 했다. (아마 useState대신 redux를 이용하고, 최상위 컴포넌트에 해당 컴포넌트를 넣으면 될것 같기도 하다.)
- 등장, 삭제 애니메이션이 없다. (아마 css animation을 쓰면 될꺼 같기도 하다.)
- 알림창이 하나밖에 없다. (아마 props로 넘기고 class로 css를 적용시키면 좋을것 같다.)

이정도 문제점이 있었는데, 그당시엔 마땅한 해결책이 생각이 안났는데,  
시간이 지나니 해결책이 있었던것 같다..

[[React] Toast 만들기](https://velog.io/@jsi06138/React-Toast-%EB%A7%8C%EB%93%A4%EA%B8%B0)  
여기서 내가 고민했던 문제들이 있었던것 같다. 참고할것

### ALOA

위에 문제점으로 인해 이번에 프로젝트 시작할때는 다른사람이 잘만든 패키지를 사용해 보고자 했다.  
선택한건 [react-toastify](https://www.npmjs.com/package/react-toastify)

[react-toastify 적용기](https://velog.io/@vanillovin/react-toastify-%EC%A0%81%EC%9A%A9%EA%B8%B0)
여기서 확인하고 그대로 적용했던것 같다.

```
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

```

나는 이렇게 썻고  
[React-toastify](https://fkhadra.github.io/react-toastify/introduction) 여기들어가면 자신에게 맞는 설정을 만들어 준다!  
그리고 css 설정은 [How to style](https://fkhadra.github.io/react-toastify/how-to-style/) 여기 확인하고
설정해주면 되는것 같다.

우리사이트엔 전체적으로 어두운 색과 단색을 이용했기 때문에 theme:colored이 이쁘긴 하지만 전체적으론  
theme:light 가 어울려서 이것으로 했다.

테마 바뀌면 알람창도 바꿀까 했지만, 다크테마는 전체적으로 어울리지 않으므로 기각

```
// 성공 알람 ( 초록색 창 )
toast.success("Success!");
// 실패 알람 ( 빨간색 창 )
toast.error("Error!");
// 경고 알람 ( 노란색 창 )
toast.warning("Warnning!");
// 정보 알람 ( 파란색 창 )
oast.info("Info...");
// 디폴트 ( 무지개 창 )
toast("default...");
```

이렇게 간편 하게 쓸수도 있고, 뒤에 옵션을 붙여서
`toast("message",{option})` 이런식으로 쓸수도 있다.
