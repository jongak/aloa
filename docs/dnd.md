## dnd

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

## 문제점

모바일 화면에서는 그나마 부드럽게 작동하지만, 데스크탑 환경에서 묘하게 움직이는게 늦게보인다.
상태관리 통해 개선해보자!

## DragDropContext

#### onDragEnd

```
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
```

드래그가 끝나고 벌어질 일을 넣으면된다.
나같은경우에 `items["done"]` 여기에 특정갯수 가 들어가면 못들어가게 막는 코드를 넣었다.

이를 useCalback을 이용하여 좀더 나은 코드를 짜보자

```
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
```

해당 코드로 바꿨지만 크게 달라진게 없어보인다...

## Droppable

```
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
        <Draggable>
        ...
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>
```

복잡하다...

## Draggable

```
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
```

### provied

동작하면서 필요한 변수를 저정? 하는 느낌인거같다.

#### provided.innerRef

라이브러리에서 우리 컴포넌트 DOM을 조작하기 위해서 `필수`로 등록해줘야 한다.

#### provided.droppableProps

그냥 우리가 전달한 `props`를 라이브러리에서 사용할 수 있는 형태로 DOM data에 등록시켜주는 것 같다.

#### provided.placeholder

drop될 때 공간을 만들기 위해서 필요하다고 한다.

#### provided.draggableProps

drag 스타일을 등록해주는 역할이다. 이게 없다면 엘리먼트가 움직이지 않을 것이다.

#### provided.dragHandleProps

drag handle를 등록해주는 인자인데 살펴보면 내부로직이 어떻게 구현했는지 조금 힌트를 얻을 수 있다.

### snapshot

Drag도중 값이 바뀌며 해당 객체의 스타일링을 바꿔주는 역할을 하는것 같다.

#### snapshot.isDragging

드래깅중인 요소가 올라가면 값이 바뀌는것 같다

```
className={`drag-body ${key} ${
  snapshot.isDraggingOver ? "drag" : ""
}`}
```

우리는 drag 될때 해당하는 Dropable 요소만 스타일링을 바꿀꺼라 한번만 사용했다...

로아 스케쥴표 기능도 계획하고있는데 그때는 react-dnd를 써봐야할것같다.
