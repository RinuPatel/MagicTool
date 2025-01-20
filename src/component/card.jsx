import React, { forwardRef } from "react";
import Tooltip from "./Tooltip";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const Card = ({ image, index, setActiveCard, onDrop, handleDeleteImage }) => {
  const id = image._id;
  const [rotation, setRotation] = useState(0);
  const { attributes, listeners, setNodeRef, transform, transition,active } = useSortable({ id:id });

  const rotateImage = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleDelete = () => {
    handleDeleteImage(image._id);
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor:active ? "grabbing":"move"
  };
  return (
    <article
      className="file"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="image-tool">
        <div className="file-rotation mx-1 cursor-pointer" onClick={rotateImage}>
          <img src="image/refresh.png" alt="" width={"22px"} />
        </div>
        <div className="file-action mx-1 cursor-pointer" onClick={handleDelete}>
          <img src="image/icons8-cancel.svg" alt="" width={"22px"} />
        </div>
      </div>
      <div
        className="file-upload-section"
        style={{ transform: `rotate(${rotation}deg)`,touchAction:"none" }}
      >
        <img
          src={image.url}
          alt={`Selected ${image.name}`}
          className="drop-image"
        />
      </div>
      
      <div className="filename">
        <Tooltip title={image.name}>
          <p className="filename-text">
            {image.name.length > 25
              ? `${image.name.substring(0, 25)}...`
              : image.name}
          </p>
        </Tooltip>
      </div>
    </article>
  );
};

export default Card;
