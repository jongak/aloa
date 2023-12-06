### dnd

dnd(drag&drop) 은 기존부터 사용해보고 싶은 기능이였다.  
locaT에서도 넣고 싶었지만, 필요가 없엇 안썻고, 이번에 ALOA에서 카드에 들어가는 내용을 정할때 왼쪽<>오른쪽으로 간단하게 사용하였다.

문제는 어디서부터 구현해야 하는지 막막했다. 이번 프로젝트 컨셉은 최단시간에 사이트 만들기(중간에 aws덕분에 많이 해맸다.) 여서 최대한 모듈을 활용하기로 했다. 눈에 뛴건 [react-beautiful-dnd로 TODO 뽀개기](https://bepyan.github.io/blog/dnd-master/6-react-beautiful-dnd) 여기였다.

[react dnd 이용하여 drag & drop 구현하기](https://velog.io/@dowon938/react-dnd-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-drag-drop-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0) 이글에 따르면,

rb-dnd는 자유도는 적지만, 간단한 기능을 구현할거면 자연스러운 고-급 애니매이션 적용이 된다고 했고,
r-dnd는 자유도가 높다고 했다.

그래서 간단한 기능을 구현하기 위해 rb-dnd를 이용하였다.

```
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setFrontIcons,
  setFrontItems,
  setOptionItems,
} from "../../store/itemSlice";

const MyDnd = function ({ title }) {
  const dispatch = useDispatch();
  var maxItems = 5;
  if (title == "optionItems") {
    maxItems = 8;
  }
  var items = [];
  if (title == "frontItems") {
    items = useSelector((state) => state.itemSlice.frontItems);
  } else if (title == "frontIcons") {
    items = useSelector((state) => state.itemSlice.frontIcons);
  } else if (title == "optionItems") {
    items = useSelector((state) => state.itemSlice.optionItems);
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
    } else if (title == "optionItems") {
      dispatch(
        setOptionItems({
          newOptionItems: item,
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
    if (_items["done"].length <= maxItems) {
      setItem(_items);
    } else {
      toast.error(`${maxItems + 1}개 이상은 넣을수 없습니다.`);
    }
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
                          className="drag-item ripple"
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

```

![img](https://user-images.githubusercontent.com/2182637/53607406-c8f3a780-3c12-11e9-979c-7f3b5bd1bfbd.gif)

- **`DragDropContext`** : ContextAPI의 Provider처럼 DND의 상태를 제공해주는 녀석이라고 보면 될 것 같다.
  여기서 onDragEnd 등 다양한 DND 이벤트를 등록 해준다.
- **`Droppable`** : DROP할 수 있는 영역으로 명시한다.
- **`Draggable`** : DRAG할 수 있게 컴포넌트를 감싸준다.
