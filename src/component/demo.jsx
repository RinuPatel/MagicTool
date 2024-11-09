import { useRef, useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../component/card"; // Assuming Card component exists
import React from "react";

const ImageToPdf = () => {
  const [images, setImages] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [isupload, setIsUpload] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setIsUpload(true);
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages(imageUrls);
    console.log(imageUrls);
    // processFiles(files);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDrop = (image, position) => {
    console.log(`${activeCard} is going to place into and at the position ${position}`);
    if (activeCard == null || activeCard === undefined) return;

    const imageToMove = images[activeCard];
    const updatedImages = [...images];
    updatedImages.splice(activeCard, 1); // Remove the active card image
    updatedImages.splice(position, 0, imageToMove); // Insert at the new position

    setImages(updatedImages);
  };

  return (
    <>
      <div className="container">
        <h1>IMAGE To PDF</h1>
        <p>
          Convert JPG images to PDF in seconds. Easily adjust orientation and
          margins.
        </p>
        <h1>Active card {activeCard}</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="main-section">
            {!isupload && (
              <div className="uploader">
                <button
                  type="button"
                  className="upload-btn"
                  onClick={handleFileUpload}
                >
                  Select JPG Images
                </button>

                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            )}

            <div className="tool">
              {/* Wrap images in a Droppable container */}
              <Droppable droppableId="droppable-images">
                {(provided) => (
                  <div
                    className="tool-workarea-render"
                    {...provided.droppableProps} // Apply droppableProps to the parent div
                    ref={provided.innerRef} // Ensure the ref is applied to the parent div
                  >
                    {images.map((image, index) => (
                      <Draggable draggableId={`draggable-${index}`} index={index} key={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef} // Apply the innerRef to the draggable div
                            {...provided.draggableProps} // Apply draggableProps to the element
                            {...provided.dragHandleProps} // Apply dragHandleProps for drag functionality
                          >
                            <Card
                              image={image}
                              index={index}
                              setActiveCard={setActiveCard}
                              onDrop={onDrop}
                              provided={provided} // You can pass the provided object to Card if needed
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder} {/* Placeholder ensures space for dragging */}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default ImageToPdf;
