import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setFrontIcons, setFrontItems } from "../../store/captureSlice";
import PopUp from "../../components/common/PopUp";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyDnd = function ({ title }) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState();
  var items = [];
  if (title == "frontItems") {
    items = useSelector((state) => state.captureSlice.frontItems);
  } else if (title == "frontIcons") {
    items = useSelector((state) => state.captureSlice.frontIcons);
  }

  const setItem = function (item) {
    if (title == "frontItems") {
      dispatch(
        setFrontItems({
          newFrontItems: item,
        })
      );
    } else if (title == "frontIcons") {
      dispatch(
        setFrontIcons({
          newFrontIcons: item,
        })
      );
    }
  };
  const onDragEnd = (DropResult) => {
    const { source, destination } = DropResult;
    if (!destination) return;

    const scourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    const _items = JSON.parse(JSON.stringify(items));
    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItem(_items);
    toast("이게없으면 안되네");
  };

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        toastClassName="제목"
        bodyClassName="내용"
        ProgressClassName="선"
        // limit={1} // 알람 개수 제한
      />

      <div
        className="drag-cover"
        style={{
          userSelect: "none",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          borderRadius: "0.5rem",
        }}
      >
        {Object.keys(items).map((key) => (
          <Droppable key={key} droppableId={key}>
            {(provided, snapshot) => (
              <div
                className={`drag-body ${key} ${
                  snapshot.isDraggingOver ? "drag" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="drag-title">
                  {key == "done" ? "활성화" : "비활성화"}
                </div>
                {items[key].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="drag-item"
                        >
                          <div className="item-title">{item.title}</div>
                          <div className="item-value">
                            {item.value ? item.value : "없음"}
                          </div>
                          <div className="item-body">{item.body}</div>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default MyDnd;
