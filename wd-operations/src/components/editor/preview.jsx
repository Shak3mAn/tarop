"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

export const Preview = ({ value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="white w-[410px] h-[200px] overflow-y-auto scrollbar-hide">
      <ReactQuill className="h-[150px]" theme="snow" value={value} readOnly />
    </div>
  );
};
