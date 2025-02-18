"use client";

import { useEffect, useState } from "react";

const Cursor = () => {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const changePos = setTimeout(() => {
      const cursor = document.getElementById("cursor");

      if (cursor) {
        cursor.style.left = `${mousePos.x}px`;
        cursor.style.top = `${mousePos.y}px`;
      }
    }, 0);

    return () => clearTimeout(changePos);
  }, [mousePos]);

  return (
    <>
      <div id="cursor" className={`fixed bg-gradient-to-tl from-neutral-300 to-neutral-400 w-5 h-5 rounded-md`}></div>
    </>
  );
};

export default Cursor;
