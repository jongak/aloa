import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

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

  const [items, setItems] = useState({
    todo: [...Array(6)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "todo",
    })),
    doing: [],
  });
  const onDragEnd = (DropResult) => {
    const { source, destination } = DropResult;
    if (!destination) return;

    const scourceKey = source.droppableId;
    const destinationKey = destination.droppableId;

    const _items = JSON.parse(JSON.stringify(items));
    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
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
    <div className="option-body" style={{ position: "relative" }}>
      <h3>02. 내용 정하기</h3>
      <div className="userRow">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid flex-1 select-none grid-cols-2 gap-4 rounded-lg">
            {Object.keys(items).map((key) => (
              <Droppable key={key} droppableId={key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      "flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]",
                      ${snapshot.isDraggingOver ? "shadow-lg" : "shadow"}
                    `}
                  >
                    <span className="text-xs font-semibold">
                      {key.toLocaleUpperCase()}
                    </span>
                    {items[key].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              "rounded-lg bg-white p-4 transition-shadow dark:bg-[#121212]",
                              ${
                                snapshot.isDragging
                                  ? "bg-opacity-90 shadow-2xl shadow-gray-400"
                                  : "shadow"
                              }
                            `}
                          >
                            <h5 className="font-semibold">{item.title}</h5>
                            <span className="text-sm text-gray-500">
                              Make the world beatiful
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
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
