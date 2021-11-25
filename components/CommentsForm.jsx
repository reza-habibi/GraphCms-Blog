import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!name || !comment || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {" "}
        افزودن دیدگاه
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="دیدگاه خود را بنویسید"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="name"
          placeholder="نام "
        />
        <input
          type="text"
          ref={emailEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="email"
          placeholder="ایمیل "
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          ref={storeDataEl}
          type="checkbox"
          id="storeData"
          name="storeData"
          value="true"
        />
        <label
          className="text-gray-500 cursor-pointer mr-2"
          htmlFor="storeData"
        >
          اطلاعات من را برای دیدگاه های بعدی ذخیره کن.
        </label>
      </div>
      {error && (
        <p className="text-xs text-red-500 ">
          پر کردن همه فیلد ها الزامی است.{" "}
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-blue-500 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          ارسال دیدگاه
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-left font-semibold mt-3 text-green-500 ">
            دیدگاه شما ثبت شد.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
