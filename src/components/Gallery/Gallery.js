import React, { useEffect, useState } from "react";
import "./gallery.css";

const Gallery = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const url = "/data.json";
    fetch(url)
      .then((result) => result.json())
      .then((data) => setImageData(data));
  }, []);

  //
  const countSelectedImages = () => {
    return imageData.filter((image) => image.checked).length;
  };
  //
  const handleCheckboxToggle = (id) => {
    setImageData((prevImageData) =>
      prevImageData.map((image) =>
        image.id === id ? { ...image, checked: !image.checked } : image
      )
    );
  };
  //
  const handleFileChange = (event) => {
    const file = event.target.files;
    const newFiles = Array.from(file).map((newFile, i) => {
      const id = imageData.length + 1;
      const image = URL.createObjectURL(newFile);
      return { id, image };
    });
    setImageData([...imageData, ...newFiles]);
  };

  //
  const handleDeleteImages = () => {
    const updatedImageData = imageData.filter((image) => !image.checked);
    setImageData(updatedImageData);
  };

  return (
    <div>
      <header>
        <h2 style={{ textAlign: "center" }}>Photo Gallery</h2>
      </header>
      <main>
        <div>
          <div style={{ textAlign: "center" }}>
            {" "}
            {countSelectedImages()} image{countSelectedImages() !== 1 && "s"}{" "}
            selected
          </div>
          <div>
            <h2>Delete Image</h2>
            <button onClick={handleDeleteImages}>Delete Image</button>
          </div>
          <div className="gallery-container">
            {imageData.length === 0 ? (
              "no image found"
            ) : (
              <div className="image-container">
                {imageData.map((image) => (
                  <div
                    key={image.id}
                    className={`image-items ${image.checked ? "checked" : ""}`}
                  >
                    <div
                      className="img-div"
                      onClick={() => handleCheckboxToggle(image.id)}
                    >
                      <img
                        src={image.image}
                        className="image"
                        alt="gallery-img"
                      />
                      <input
                        type="checkbox"
                        checked={image.checked}
                        className="image-checkbox"
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                ))}
                <div>
                  <input
                    type="file"
                    name="image"
                    title="add-image"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <div></div>
    </div>
  );
};

export default Gallery;
