import { useRef, useState } from "react";
import Card from "../component/card";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  closestCorners,
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSwappingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const ImageToPdf = () => {
  const [images, setImages] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setIsUpload(true);
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      _id: uuidv4(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prevImages)=>[...prevImages,...imageUrls]);
    console.log("select image here===>", imageUrls);
  };

  const getPosition = (id) => images.findIndex((image) => image._id == id);

  const handleDeleteImage = (_id) => {
    const updatedImages = images.filter((image) => image._id !== _id);
    setImages(updatedImages);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("action id", active, over);
    if (active.id === over.id) return;
    setImages(() => {
      const originalPosition = getPosition(active.id);
      const LatestPosition = getPosition(over.id);
      return arrayMove(images, originalPosition, LatestPosition);
    });
    console.log("images updated", images);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source } = result;

    if (!destination) {
      console.log("Dropped outside a valid droppable area");
      return;
    }

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setImages(reorderedImages);
  };

  return (
    <div className="container">
      <h1>IMAGE To PDF</h1>
      <p>
        Convert JPG images to PDF in seconds. Easily adjust orientation and
        margins.
      </p>
      <div className="pdf-section">
        <div className="main-section">
          {!isUpload && (
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
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
              />
            </div>
          )}
          <DndContext
            collisionDetection={closestCorners}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <div className="file-drag-Area">
              <SortableContext
                items={images.map((image) => image._id.toString())}
                strategy={horizontalListSortingStrategy}
              >
                {images && images.length > 0
                  ? images.map((image, index) => (
                      <div className="item-drop" key={image._id}>
                        <div className="">
                          <Card
                            image={image}
                            setActiveCard={setActiveCard}
                            handleDeleteImage={handleDeleteImage}
                          />
                        </div>
                      </div>
                    ))
                  : ""}
              </SortableContext>
            </div>
          </DndContext>
        </div>
        {isUpload && (
          <div className="add-more-section">
            <button
              className="add-btn cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              +
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
            />
          </div>
        )}
      </div>
      {isUpload && (
        <div>
          <button className="btn btn-convert">Convert Here</button>
        </div>
      )}
    </div>
  );
};

export default ImageToPdf;
