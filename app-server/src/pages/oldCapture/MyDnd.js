import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setAcc,
  setFrontIcons,
  setFrontItems,
  setOptionItems,
} from "../../store/itemSlice";

const MyDnd = function ({ title, onclick }) {
  const dispatch = useDispatch();
  var maxItems = 5;
  if (title == "optionItemsCombat" || title == "optionItemsNaesil") {
    maxItems = 8;
  }
  var items = [];
  if (title == "frontItems") {
    items = useSelector((state) => state.frontItems);
  } else if (title == "frontIconsCombat" || title == "frontIconsNaesil") {
    items = useSelector((state) => state.frontIcons);
  } else if (title == "optionItemsCombat" || title == "optionItemsNaesil") {
    items = useSelector((state) => state.optionItems);
  }

  const setItem = function (item) {
    if (title == "frontItems") {
      dispatch(
        setFrontItems({
          newFrontItems: item,
        })
      );
    } else if (title == "frontIconsCombat" || title == "frontIconsNaesil") {
      dispatch(
        setFrontIcons({
          newFrontIcons: item,
        })
      );
    } else if (title == "optionItemsCombat" || title == "optionItemsNaesil") {
      dispatch(
        setOptionItems({
          newOptionItems: item,
        })
      );
    }
  };
  const onDragEnd = useCallback(
    (DropResult) => {
      const { source, destination } = DropResult;
      if (!destination) return;

      const scourceKey = source.droppableId;
      const destinationKey = destination.droppableId;

      const _items = JSON.parse(JSON.stringify(items));
      const [targetItem] = _items[scourceKey].splice(source.index, 1);
      _items[destinationKey].splice(destination.index, 0, targetItem);
      if (_items["done"].length <= maxItems) {
        setItem(_items);
      } else {
        toast.error(`${maxItems + 1}개 이상은 넣을수 없습니다.`);
      }
      return;
    },
    [items]
  );

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
      <div
        className="drag-cover"
        style={{
          userSelect: "none",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          borderRadius: "0.5rem",
        }}
      >
        {Object.keys(items).map((key) => {
          if (title == "frontIconsCombat" && key == "todo Naesil") {
            return false;
          } else if (title == "frontIconsNaesil" && key == "todo Combat") {
            return false;
          } else if (title == "optionItemsCombat" && key == "todo Naesil") {
            return false;
          } else if (title == "optionItemsNaesil" && key == "todo Combat") {
            return false;
          }

          return (
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
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="drag-item ripple"
                            onClick={
                              item.onclick
                                ? () => {
                                    const userInput =
                                      window.prompt("악추피를 입력하세요");
                                    if (userInput == null || isNaN(userInput)) {
                                      toast.error("숫자를 입력하셔야 합니다.");
                                      return;
                                    }
                                    dispatch(
                                      setAcc({ newAcc: userInput + "%" })
                                    );
                                  }
                                : () => {}
                            }
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
          );
        })}
      </div>
    </DragDropContext>
  );
};
export default MyDnd;
