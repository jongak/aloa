import { useCallback, useEffect, useState, memo, useMemo } from "react";
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

const DraggableItem = memo(function ({ item, provided, snapshot, onAccInput }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="drag-item ripple"
      onClick={item?.onclick ? onAccInput : undefined}
    >
      <div className="item-title">{item?.title}</div>
      <div className="item-value">{item?.value || "없음"}</div>
      <div className="item-body">{item?.body}</div>
    </div>
  );
});

const MyDndComponent = function ({ title, onclick }) {
  const dispatch = useDispatch();
  const maxItems = useMemo(() => {
    return ["optionItemsCombat", "optionItemsNaesil"].includes(title) ? 8 : 5;
  }, [title]);
  var items = [];
  if (title == "frontItems") {
    items = useSelector((state) => state.itemSlice.frontItems);
  } else if (title == "frontIconsCombat" || title == "frontIconsNaesil") {
    items = useSelector((state) => state.itemSlice.frontIcons);
  } else if (title == "optionItemsCombat" || title == "optionItemsNaesil") {
    items = useSelector((state) => state.itemSlice.optionItems);
  }

  const handleAccInput = useCallback(() => {
    const userInput = window.prompt("악추피를 입력하세요");
    if (userInput == null || isNaN(userInput)) {
      toast.error("숫자를 입력하셔야 합니다.");
      return;
    }
    dispatch(setAcc({ newAcc: `${userInput}%` }));
  }, [dispatch]);

  const setItem = useCallback(
    (item) => {
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
    },
    [dispatch, title]
  );

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
    [items, maxItems, setItem]
  );

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
                      key={item?.id ?? ""}
                      draggableId={item?.id ?? ""}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <DraggableItem
                            item={item}
                            provided={provided}
                            snapshot={snapshot}
                            onAccInput={handleAccInput}
                          />
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

const MyDnd = memo(MyDndComponent);
MyDnd.displayName = "MyDnd";
DraggableItem.displayName = "DraggableItem";

export default MyDnd;
