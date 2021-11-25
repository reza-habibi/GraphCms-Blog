import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import "moment/locale/fa";
import { getComments } from "../services";
import parse from 'html-react-parser';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
  <>
    {Comments.length>0 && (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {comments.length}
          {' '}
          دیدگاه
        </h3>
        {comments.map((comment)=>(
          <div className="border-b border-gray-100 mb-4 pb-4" key={comment.createdAt}>
            <p className="mb-4">
              <span className="font-semibold">{comment.name}</span>
              {' '}
              در 
              {' '}
              {moment(comment.createdAt).locale("fa").format("DD MMM, YYYY")}
            </p>
            <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.comment)}</p>
          </div>
        ))}
      </div>
    )}
  </>
  );
};

export default Comments;
