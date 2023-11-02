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

  return (
    <div>
      <header>
        <h2>Photo Gallery</h2>
      </header>
      <main>
        <div>
          <div className="gallery-container">
            {imageData.length === 0 ? (
              "no image found"
            ) : (
              <div className="image-container">
                {imageData.map((image) => (
                  <div key={image.id} className="image-items">
                    <div className="img-div">
                      <input type="checkbox" className="image-checkbox" />
                      <img
                        src={image.image}
                        className="image"
                        alt="gallery-img"
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
