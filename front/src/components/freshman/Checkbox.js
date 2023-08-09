import React, { useState } from "react";
import "./Checkbox.css";
import Checklist from "./Checklist";

function Checkbox() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems
      ? JSON.parse(storedItems)
      : [
          { id: 1, text: "낚시 채비 법 알아보기", completed: false },
          { id: 2, text: "미끼 챙기기", completed: false },
          { id: 3, text: "장소찾기", completed: false },
        ];
  });

  const addItem = () => {
    if (item.trim() !== "") {
      const newItem = { id: Date.now(), text: item, completed: false };
      setItems([...items, newItem]);
      localStorage.setItem("items", JSON.stringify([...items, newItem]));
      setItem("");
    }
  };

  const toggleCompletion = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const removeedItems = items.filter((item) => item.id !== id);
    setItems(removeedItems);
    localStorage.setItem("items", JSON.stringify(removeedItems));
  };

  return (
    <div className="checkbox-wrapper">
      <div>
        <div className="checklist">
          {items.map((item) => (
            <Checklist
              key={item.id}
              text={item.text}
              completed={item.completed}
              onToggle={() => toggleCompletion(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
        <div className="checkbox-input">
          <input
            type="text"
            placeholder="추가로 할 일을 입력해주세요."
            className="checkbox-inputbox"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="check-btn" type="submit" onClick={addItem}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkbox;
