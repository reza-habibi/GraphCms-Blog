import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <div className="bg-white w-full p-8 mb-8 shadow-lg rounded-lg pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">دسته بندی ها</h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="block cursor-pointer pb-3 mb-3">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
