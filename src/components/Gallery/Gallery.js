import React, { useEffect, useRef, useState } from "react";
import "./gallery.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";

const Gallery = () => {
  const [imageData, setImageData] = useState([]);
  const fileInputRef = useRef(null);
  // fetch image data

  useEffect(() => {
    const url = "/data.json";
    fetch(url)
      .then((result) => result.json())
      .then((data) => setImageData(data));
  }, []);

  // count selected image fn
  const countSelectedImages = () => {
    return imageData.filter((image) => image.checked).length;
  };

  //toggle checkbox for select image
  const handleCheckboxToggle = (id) => {
    setImageData((prevImageData) =>
      prevImageData.map((image) =>
        image.id === id ? { ...image, checked: !image.checked } : image
      )
    );
  };

  //upload image
  const handleFileChange = (event) => {
    const file = event.target.files;
    const newFiles = Array.from(file).map((newFile, i) => {
      const id = imageData.length + 1;
      const image = URL.createObjectURL(newFile);
      return { id, image };
    });
    setImageData([...imageData, ...newFiles]);
  };

  // delete image fn
  const handleDeleteImages = () => {
    const updatedImageData = imageData.filter((image) => !image.checked);
    setImageData(updatedImageData);
  };

  //drag and drop fn

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(imageData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageData(items);
  }

  //
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      {/* gallery header */}
      <header className="gallery-title">
        <h2>Photo Gallery</h2>
      </header>

      {/* main content */}

      <main>
        <div className="img-gallery">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="selected-img">
              <span> {countSelectedImages()}</span> image
              {countSelectedImages() >= 2 && "s"} {""}
              selected
            </div>

            {/* delete image */}
            <div className="delete-img">
              <BiTrash title="Delete Image" onClick={handleDeleteImages} />
            </div>
          </div>

          {/* gallery container */}
          <div className="gallery-container">
            {imageData.length === 0 ? (
              "no image found"
            ) : (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="imageData" direction="horizontal">
                  {(provided) => (
                    <div
                      className="image-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {imageData.map((image, i) => {
                        return (
                          <div
                            key={image.id}
                            className={`image-items ${
                              image.checked ? "checked" : ""
                            }`}
                          >
                            <Draggable draggableId={image?.id} index={i}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="img-div"
                                  onClick={() => handleCheckboxToggle(image.id)}
                                >
                                  <img src={image.image} alt="gallery-img" />

                                  <input
                                    type="checkbox"
                                    checked={image.checked}
                                    className="image-checkbox"
                                    onChange={() => {}}
                                  />
                                </div>
                              )}
                            </Draggable>
                          </div>
                        );
                      })}

                      {/* image upload */}
                      <div class="file-input-container">
                        <label htmlFor="image" class="custom-file-upload">
                          <input
                            ref={fileInputRef}
                            type="file"
                            name="image"
                            id="image"
                            title="Add-image"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            multiple
                          />
                          <img
                            src="/img/upload.svg"
                            alt="Uploaded img"
                            id="preview-image"
                            class="preview-image"
                          />
                          <button
                            className="add-img-btn"
                            onClick={handleButtonClick}
                          >
                            Add Images
                          </button>
                        </label>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
