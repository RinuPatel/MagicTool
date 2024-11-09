import { useRef, useState } from "react";
import Card from "../component/card";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
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
      _id: uuidv4(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages(imageUrls);
    console.log(imageUrls);
  };

  const handleDeleteImage = (_id) => {
    const updatedImages = images.filter((image) => image._id != _id);
    setImages(updatedImages);
  };

  const processFiles = (files) => {
    const imageUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDrop = (image, position) => {
    console.log(
      `${activeCard} is going to place into and at the position ${position}`
    );
    if (activeCard == null || activeCard === undefined) return;
    const imageToMove = images[activeCard];
    const updatedImages = [...images];
    updatedImages.splice(activeCard, 1); // Remove the active card image
    updatedImages.splice(position, 0, imageToMove); // Insert at the new position

    setImages(updatedImages);
  };
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If the item is dropped outside the list (no destination)
    if (!destination) {
      console.log("call this");
      return;
    }

    // If the item is dropped in the same place, no need to update
    // if (destination.index === source.index) {
    //   console.log("call here",destination.index);
    //   return;
    // }
    const reorderItem = reorder(images, source.index, destination.index);
    console.log("recorded order", reorderItem);
    // Reorder the items based on the drag and drop
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(source.index, 1);
    reorderedImages.splice(destination.index, 0, removed);

    // Update the state with the new order
    setImages(reorderedImages);
  };

  return (
    <>
      <div className="container">
        <h1>IMAGE To PDF</h1>
        <p>
          Convert JPG images to PDF in seconds. Easily adjust orientation and
          margins.
        </p>
        {/* <h1>Active card {activeCard}</h1> */}
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
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
            {images.map((image, index) => (
              <>
                {/* <Droppable droppableId={image._id.toString()} key={index}> */}
                {/* {(provided) => ( */}
                <div
                  className="file"
                  // {...provided.droppableProps}
                  // ref={provided.innerRef}
                >
                  <div className="tool-workarea-render">
                    {/* <Draggable 
                          draggableId={image._id.toString()} 
                          index={index}
                          key={index}
                        > */}
                    {/* {(provided) => { */}
                    {/* return ( */}
                    {/* <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      > */}
                    <Card
                      image={image}
                      index={index}
                      setActiveCard={setActiveCard}
                      onDrop={onDrop}
                      handleDeleteImage={handleDeleteImage}
                      // provided={provided}
                    />
                    {/* </div> */}
                    {/* ); */}
                    {/* }} */}
                    {/* </Draggable> */}
                    {/* {provided.placeholder}                       */}
                  </div>
                </div>
                {/* )} */}
                {/* </Droppable> */}
              </>
            ))}
          </div>
        </div>
        {isupload && (
          <div>
            <button className="btn btn-convert">Convert Here</button>
          </div>
        )}

        {/* </DragDropContext> */}
      </div>
    </>
  );
};
export default ImageToPdf;
