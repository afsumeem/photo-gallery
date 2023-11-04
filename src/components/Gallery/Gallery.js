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
                  <h2>add image</h2>
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
