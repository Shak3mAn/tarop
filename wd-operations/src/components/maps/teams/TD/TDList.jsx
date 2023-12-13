"use client";

import React, { useContext, useEffect, useRef } from "react";

import { useTDListSwitcher } from "../../../../store/use-general";

import { TDItem } from "./TDItem";
import { SelectedTeamContext } from "../../../../lib/context/context";

export const TDList = ({ teams, drivers }) => {
  const elementRef = useRef(null);
  const { isTDList } = useTDListSwitcher();

  useEffect(() => {
  }, [isTDList]);

  const slideRight = (element) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= 500;
  };

  return (
    <>
      <div className="flex justify-center sm:justify-start md:justify-start items-center">
        <div
          className="grid grid-cols-1 gap-y-4 sm:gap-y-6 sm:grid-cols-2 sm:gap-x-10 h-[450px] md:flex md:flex-row md:h-auto justify-start overflow-y-auto md:overflow-x-auto pt-1 md:gap-4 scrollbar-hide"
          ref={elementRef}
        >
          {/* Teams.. */}
          {isTDList?.label == "Teams" &&
            teams.map((item, index) => (
              <div key={item.id}>
                <TDItem tdItems={item} />
              </div>
            ))}

          {/* Driver */}
          {isTDList?.label == "Drivers" &&
            drivers.map((item, index) => (
              <div key={item.id}>
                <TDItem tdItems={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
