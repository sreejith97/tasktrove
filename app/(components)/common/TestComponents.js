"use client";
import React, { useState } from "react";

const TestComponents = () => {
  const [startX, setStartX] = useState({});
  const [movedX, setMovedX] = useState({});
  const [testArray, setTestArray] = useState([
    {
      id: 1,
      title: "Complete homework",
      description: "Finish math assignment and English essay",
      status: false,
      isFavorite: false,
      isDeleted: false,
      time: new Date(),
      initialMovedX: 0, // Initial movement is 0
    },
    {
      id: 2,
      title: "Buy groceries",
      description: "Milk, eggs, bread, and fruits",
      status: false,
      isFavorite: true,
      isDeleted: false,
      time: new Date(),
      initialMovedX: 0,
    },
    {
      id: 3,
      title: "Exercise",
      description: "Go for a run in the park",
      status: true,
      isFavorite: false,
      isDeleted: true,
      time: new Date(),
      initialMovedX: 0,
    },
  ]);

  const handleMouseDown = (itemId, e) => {
    setStartX({ ...startX, [itemId]: e.clientX });
  };

  const handleMouseMove = (itemId, e) => {
    if (startX[itemId] !== undefined) {
      const currentX = e.clientX;
      const deltaX = currentX - startX[itemId];
      const newMovedX = Math.min(Math.max(deltaX, -30), 30); // Limit movement to max 30px left or right

      setMovedX({ ...movedX, [itemId]: newMovedX });
    }
  };

  const handleMouseUp = (itemId) => {
    setStartX({ ...startX, [itemId]: undefined });

    // Reset movedX to 0 after mouse up
    setTimeout(() => {
      setMovedX({ ...movedX, [itemId]: 0 });
    }, 200); // Adjust the duration as needed, 200ms matches the transition duration
  };

  return (
    <div className="text-black w-full flex justify-center">
      <div className="w-[500px] bg-slate-400 p-2">
        {testArray.map((item) => (
          <div
            key={item.id}
            className="todo-item bg-white p-2 mb-2 select-none"
            onMouseDown={(e) => handleMouseDown(item.id, e)}
            onMouseMove={(e) => handleMouseMove(item.id, e)}
            onMouseUp={() => handleMouseUp(item.id)}
            style={{
              transform: `translateX(${
                movedX[item.id] || item.initialMovedX
              }px)`,
            }}
          >
            <h1 className="text-lg font-semibold">{item.title}</h1>
            <p className="text-gray-600">{item.description}</p>
            {/* You can add more content here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestComponents;
