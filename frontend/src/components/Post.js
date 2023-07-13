import React from "react";

const Post = (props) => {
  return (
    <div className="flex flex-col bg-white border border-solid border-slate-200 rounded-xl my-4 shadow-md p-4 justify-center gap-4 max-w-sm mx-auto">
      <img
        className="mx-auto w-50 h-64"
        src={props.imageUrl}
        alt="Not available"
      ></img>
      <h3 className="text-xl h-12 my-auto font-merriweather">{props.name}</h3>
      <p className="text-lg text-slate-700 italic">{props.author}</p>
    </div>
  );
};

export default Post;
