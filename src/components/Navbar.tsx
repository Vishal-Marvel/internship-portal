import React from "react";
import UserButton from "./UserButton";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { publicRoutes } from "@/providers/Provider";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={cn(
        publicRoutes.includes(pathname)
          ? "hidden"
          : "md:absolute md:top-3 md:left-1/2 md:-translate-x-1/2 md:w-3/4 w-full md:rounded-3xl md:h-[7%] bg-slate-300/25"
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
