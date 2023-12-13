"use client";

import React from "react";

import { DriverItem } from "./driver-item";

export const DriversList = ({ drivers }) => {
  return (
    <>
      {drivers.map((driver, index) => (
        <div key={index}>
          <DriverItem team={driver} />
        </div>
      ))}
    </>
  );
};
