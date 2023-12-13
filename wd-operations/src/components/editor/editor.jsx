"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

export const Editor = ({ onChange, value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="white w-[325px] h-[220px] md:w-[410px] md:h-[200px] overflow-y-auto scrollbar-hide">
      <ReactQuill className="h-[150px]" theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
