import React, { forwardRef } from "react";
import Tooltip from "./Tooltip";
import { useState } from "react";

const Card = ({ image, index, setActiveCard, onDrop, handleDeleteImage }) => {
  const [rotation, setRotation] = useState(0);
  const rotateImage = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleDelete = () => {
    handleDeleteImage(image._id);
  };

  return (
    <article
      className="file image-pdf"
      // draggable
      // onDragStart={()=>setActiveCard(index)}
      // onDragEnd={()=>setActiveCard(null)}
      // ref={provided.innerRef}
      // {...provided.draggableProps}
      // {...provided.dragHandleProps}
    >
      <div
        className="file-upload-section"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <img
          src={image.url}
          alt={`Selected ${image.name}`}
          className="drop-image"
        />
      </div>
      <div className="image-tool">
        <div className="file-rotation" onClick={rotateImage}>
          <img src="image/refresh.png" alt="" width={"22px"} />
        </div>
        <div className="file-action" onClick={handleDelete}>
          <img src="image/icons8-cancel.svg" alt="" width={"22px"} />
        </div>
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
