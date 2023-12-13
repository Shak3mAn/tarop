"use client";

import { Separator } from "../ui/separator";

export const DashFooter = () => {
  const currentYear = new Date().getFullYear();
  const author = "shak3mAn";

  return (
    <footer className="bg-background text-muted-foreground p-4 text-center">
      <Separator />
      <p className="sm:pt-6 pt-6 pb-12 items-center text-sm justify-center flex sm:pb-6">
        &copy; {currentYear}  | &#x1F9C3; {author} | All rights reserved.
      </p>
    </footer>
  );
};

export const LandingFooter = () => {
    const currentYear = new Date().getFullYear();
    const author = "shak3mAn";
  
    return (
      <footer className="bottom-0 bg-[#020817] text-white p-4 text-center">
        <Separator />
        <p className="sm:pt-6 pt-6 pb-12 items-center text-sm justify-center flex sm:pb-6">
          &copy; {currentYear}  | &#x1F9C3; {author} | All rights reserved.
        </p>
      </footer>
    );
  };