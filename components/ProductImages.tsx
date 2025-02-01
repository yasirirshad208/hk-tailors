
"use client"
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-[100%] lg:h-[80%] h-[380px]">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Side Images */}
      <div className="h-[20%] max-w-[600px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <div className="flex flex-row gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Side ${index + 1}`}
              className={`w-full h-20 object-cover cursor-pointer rounded-lg ${
                selectedImage === image ? "border-2 border-orange-500" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
