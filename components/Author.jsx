import React from "react";
import Image from "next/image"
const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute right-0 left-0 -top-14">
        <Image
          src={author.photo.url}
          alt={author.name}
          height="100px"
          width="100px"
          unoptimized
          className="align-middle rounded-full"
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
