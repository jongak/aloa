import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import styles from "./Main.module.css";
import ToggleButton from "../../components/common/ToggleButton";

const SelectValue = function () {
  const { setPage, characterNameRef } = useOutletContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [isName, setIsName] = useState(true);
  const [isServer, setIsServer] = useState(false);

  // if (!characterNameRef.current) {
  //   navigate("../");
  // }
  useEffect(() => {
    setPage("select");
  }, []);

  const [draggingSectionId, setDraggingSectionId] = useState(null); // 지금드래고 하고있는 요소가 있는 섹션
  const draggingItemIndex = useRef(); //지금 드래그하고있는 요소
  const draggingOverItemIndex = useRef(); //지금 드래그 하고있는 요소가 지나간 요소
  const [availableOptionsArr, setAvailableOptionsArr] = useState([
    "0",
    "1",
    "2",
  ]);
  const [selectedOptionsArr, setSelectedOptionsArr] = useState(["a", "b", "c"]);

  //잡았을때 잡은요소 저장
  const onDragStart = (e, index, id) => {
    draggingItemIndex.current = index;
    e.target.classList.add("grabbing");
    console.log(index);
    setDraggingSectionId(id); // 2
  };

  // 드래그중일때 실행
  const onLeftItemDragEnter = (e, index) => {
    // 3-1
    if (draggingSectionId === 0) {
      // 3-1
      draggingOverItemIndex.current = index; //드래그중일때 지나간것 저장
      const copyListItems = [...availableOptionsArr];
      const dragItemContent = copyListItems[draggingItemIndex.current];
      // 얕은 복사로 만든 카피 배열에서 드래깅되는 아이템을 하나 제거해주고
      copyListItems.splice(draggingItemIndex.current, 1);
      // 카피 리스트 배열에서 드레깅되는 아이템이 지나간 아이템의 인덱스에 드레그된 아이템을 추가해준다.
      copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent);
      // 드래깅된 아이템의 장소를 드래그 오버된 아이템의 인덱스로 바꾸어준다.
      draggingItemIndex.current = draggingOverItemIndex.current;
      // 드래그 오버 아이템의 useRef객체의 current 값을 초기화해준다.
      draggingOverItemIndex.current = null;
      // 리스트를 새롭게 랜더링할 수 있도록 상태를 업데이트해준다.
      setAvailableOptionsArr(copyListItems);
    }
  };

  const onRightItemDragEnter = (e, index) => {
    // 3-2
    if (draggingSectionId === 1) {
      // 3-2
      draggingOverItemIndex.current = index;
      const copyListItems = [...selectedOptionsArr];
      const dragItemContent = copyListItems[draggingItemIndex.current];
      // 얕은 복사로 만든 카피 배열에서 드래깅되는 아이템을 하나 제거해주고
      copyListItems.splice(draggingItemIndex.current, 1);
      // 카피 리스트 배열에서 드레깅되는 아이템이 지나간 아이템의 인덱스에 드레그된 아이템을 추가해준다.
      copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent);
      // 드래깅된 아이템의 장소를 드래그 오버된 아이템의 인덱스로 바꾸어준다.
      draggingItemIndex.current = draggingOverItemIndex.current;
      // 드래그 오버 아이템의 useRef객체의 current 값을 초기화해준다.
      draggingOverItemIndex.current = null;
      // 리스트를 새롭게 랜더링할 수 있도록 상태를 업데이트해준다.
      setSelectedOptionsArr(copyListItems);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnd = (e) => {
    e.target.classList.remove("grabbing");
  };

  return (
    <div className="option-body">
      <h3>02. 내용 정하기</h3>
      <div className="userRow">
        {availableOptionsArr.map((item, index) => (
          <div
            key={`a{index}`}
            style={{
              backgroundColor: "lightblue",
              margin: "20px 25%",
              textAlign: "center",
              fontSize: "40px",
            }}
            // onClick={(e) => onClickHandler(e, idx)}
            onDragStart={(e) => onDragStart(e, index, 0)}
            onDragEnter={(e) => onLeftItemDragEnter(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDragEnd={(e) => onDragEnd(e)}
            draggable
          >
            {item}
          </div>
        ))}

        {selectedOptionsArr.map((item, index) => (
          <div
            key={`a{index}`}
            style={{
              backgroundColor: "lightblue",
              margin: "20px 25%",
              textAlign: "center",
              fontSize: "40px",
            }}
            // onClick={(e) => onClickHandler(e, idx)}
            onDragStart={(e) => onDragStart(e, index, 1)}
            onDragEnter={(e) => onRightItemDragEnter(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDragEnd={(e) => onDragEnd(e)}
            draggable
          >
            {item}
          </div>
        ))}
      </div>
      <div className="userRow">
        <ToggleButton
          valueRef={isName}
          setValueRef={setIsName}
          title={"닉네임 표시"}
          body={"닉네임을 숨깁니다."}
        />
        <ToggleButton
          valueRef={isServer}
          setValueRef={setIsServer}
          title={"칭호 표시"}
          body={"칭호를 숨깁니다."}
        />
        <ToggleButton
          valueRef={isServer}
          setValueRef={setIsServer}
          title={"레벨 근사"}
          body={"아이템 레벨을 근사값으로 표현합니다."}
        />
      </div>

      <div>{characterNameRef.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};

export default SelectValue;
