import React from "react";
import UserButton from "./UserButton";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={cn(
        pathname == "/"
          ? "hidden"
          : "absolute top-3 left-1/2 -translate-x-1/2 w-3/4 rounded-3xl h-[7%] bg-slate-300/25"
      )}
    >
      <div className=" h-full  relative flex w-full justify-center">
        <div className="flex items-center w-[90%] justify-between">
          <div className="flex">
            <Link
              to={"/dashboard"}
              className={cn(
                pathname == "/dashboard" &&
                  "bg-slate-300/80 text-black rounded-lg ",
                "flex items-center transition-all text-slate-300/80 duration-100 ease-in"
              )}
            >
              <Button className=" uppercase" variant="link">
                Dashboard
              </Button>
            </Link>
            <Link
              to={"/student/addInternship"}
              className={cn(
                pathname == "/student/addInternship" &&
                  "bg-slate-300/80 text-black rounded-lg ",
                "flex items-center transition-all text-slate-300/80 duration-100 ease-in"
              )}
            >
              <Button className=" uppercase" variant="link">
                Add Internship
              </Button>
            </Link>
          </div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
