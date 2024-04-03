"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axiosInstance from "@/lib/axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/providers/theme-provider";

const UserButton = ({ setClose }: { setClose?: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { token, clearSession, role } = useSession();
  //@ts-ignore
  const [response, setResponse] = useState<UserData>();
  const [image, setImage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const router = useNavigate();
  const { setTheme } = useTheme();

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/internship/api/v1/students/viewStudent",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setResponse(response.data.data.student);
    } catch (error) {
      if (error.response.data.message == "User does not exist") clearSession();

      // console.error(error);
    }
  };
  useEffect(() => {
    if (token) getData();
  }, [token]);

  const handleLogout = () => {
    setOpen(false);
    router("/");
    setTheme("default");
    clearSession();
  };
  const getImage = async () => {
    if (response) {
      const imageResponse = await axiosInstance.get(
        "http://localhost:5000/internship/api/v1/students/image/" +
          response.profile_photo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setImage(imageResponse.data.image);
    }
  };

  useEffect(() => {
    getImage();
  }, [response]);

  // useEffect(() => {
  //   const blobToDataURL = (blob) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(blob);
  //   };

  //   blobToDataURL(image);
  // }, [image]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {token && (
        <Popover
          open={open}
          onOpenChange={() => {
            if (image) setOpen(!open);
          }}
        >
          <PopoverTrigger>
            <Avatar className="border-2 border-gray-300">
              <AvatarImage
              className="object-cover"
                src={"data:image/jpeg;charset=utf-8;base64," + image}
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="w-full flex flex-col gap-3 items-center">
              <img src={"data:image/jpeg;charset=utf-8;base64," + image} height={100} width={100} className="rounded-full shadow-xl"/>
              <div>
                <span>{response?.name}</span>
                {" - "}
                <span className=" text-sm text-gray-400">
                  {response?.email}
                </span>
              </div>
              {role && role.includes("student") && (
                <Link
                  to={"/student/profile"}
                  className="w-full"
                  onClick={() => {
                    if (setClose) setClose();
                    setOpen(false);
                  }}
                >
                  <Button
                    variant={"secondary"}
                    className="w-full flex gap-2 bg-gray-200"
                  >
                    View Profile
                  </Button>
                </Link>
              )}

              <Link
                to={"/auth/resetPassword"}
                className="w-full"
                onClick={() => {
                  if (setClose) setClose();
                  setOpen(false);
                }}
              >
                <Button
                  variant={"secondary"}
                  className="w-full flex gap-2 bg-gray-200"
                >
                  Reset Password
                </Button>
              </Link>
              <Button className="w-full" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default UserButton;
