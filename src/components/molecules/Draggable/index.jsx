import { useEffect, useRef, useState } from "react";
const Draggable = ({
    innerRef,
    rootClass = "",
    rootId = "",
    children,
    checkMouseUpProps = false,
}) => {
    const ourRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0,
    });
    const handleDragStart = (e) => {
        if (!ourRef.current) return;
        const slider = document.getElementById(rootId);
        const startX = e.pageX - slider.offsetLeft;
        const startY = e.pageY - slider.offsetTop;
        const scrollLeft = slider.scrollLeft;
        const scrollTop = slider.scrollTop;
        mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
        setIsMouseDown(true);
        document.body.style.cursor = "grabbing";
    };
    const handleDragEnd = (e) => {
        setIsMouseDown(false);
        if (!ourRef.current) return;
        document.body.style.cursor = "default";
    };
    const handleDrag = (e) => {
        if (!isMouseDown || (!ourRef.current && checkMouseUpProps)) return;
        e.preventDefault();
        const slider = document.getElementById(rootId);
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        const walkY = (y - mouseCoords.current.startY) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    };

    return (
        <div
            ref={ourRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDrag}
            onMouseLeave={handleDragEnd}
            className={rootClass}
            id={rootId}
        >
            {children}
        </div>
    );
};

export default Draggable;
