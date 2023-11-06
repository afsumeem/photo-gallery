import React, { useEffect, useRef, useState } from "react";
import "./gallery.css";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

  //
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  //Drag and drop

  const handleImageDragStart = (event, index) => {
    const { dataTransfer } = event;
    dataTransfer.setData("text/plain", index.toString());
  };

  const handleImageDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleImageDrop = (event, dropIndex) => {
    event.preventDefault();
    const dragIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
    if (dragIndex !== dropIndex) {
      const updatedImages = [...imageData];
      const [draggedImage] = updatedImages.splice(dragIndex, 1);
      updatedImages.splice(dropIndex, 0, draggedImage);
      setImageData(updatedImages);
    }
  };

  return (
    <div>
      {/* gallery header */}
      <header className="gallery-title">
        <h2>Photo Gallery</h2>
      </header>

      {/* main content */}

      <main>
        <div className="img-gallery">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/*  */}
            <div className="selected-img">
              <span> {countSelectedImages()}</span> image
              {countSelectedImages() >= 2 && "s"} {""}
              selected
            </div>

            {/* delete image */}

            {countSelectedImages() <= 0 ? (
              <button
                className="delete-img"
                onClick={handleDeleteImages}
                title="Delete Image"
                disabled
              >
                <BiTrash />
              </button>
            ) : (
              <button
                className="delete-img"
                onClick={handleDeleteImages}
                title="Delete Image"
              >
                <BiTrash />
              </button>
            )}
          </div>

          {/* gallery container */}
          <div className="gallery-container">
            {imageData.length === 0 ? (
              "no image found"
            ) : (
              <div className="image-container">
                {imageData.map((image, i) => {
                  return (
                    <div
                      draggable
                      onDragStart={(event) => handleImageDragStart(event, i)}
                      onDragOver={(event) => handleImageDragOver(event, i)}
                      onDrop={(event) => handleImageDrop(event, i)}
                      key={image.id}
                      className={`image-items ${
                        image.checked ? "checked" : ""
                      }`}
                    >
                      <div
                        className="img-div"
                        onClick={() => handleCheckboxToggle(image.id)}
                      >
                        {/* gallery image */}

                        <img src={image.image} alt="gallery-img" />

                        {/* checkbox */}

                        <input
                          type="checkbox"
                          checked={image.checked}
                          className="image-checkbox"
                          onChange={() => {}}
                        />
                      </div>
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
                    <button className="add-img-btn" onClick={handleButtonClick}>
                      Add Images
                    </button>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
