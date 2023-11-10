import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const MyDnd = function ({ items, setItems }) {
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
                          className="drag-item"
                        >
                          <div className="item-title">{item.title}</div>
                          <div className="item-value">{item.value}</div>
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