import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {PartyPopperIcon, OctagonXIcon, OctagonAlertIcon, BadgeInfoIcon}  from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "@radix-ui/react-select";

  const NotificationBox = () => {
  
    return (
        <div className="flex items-center w-[92%] justify-between">

        <div className="flex gap-2">
        <Avatar>
  <AvatarImage src="[staff profile pic]" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
        </div>
          <div className="flex gap-2">
      <Card className=" shadow-2xl bg-white rounded-2xl">
        <CardHeader>
          <CardTitle>[name of staff posted]</CardTitle>
            <Icon><PartyPopperIcon></PartyPopperIcon></Icon> {/* one out of 4 icon from lucide icon */}
        </CardHeader>
        <CardContent>
            [notification content]
        </CardContent>
        <CardFooter className="flex text-center ">
            [sent by staffname]
        </CardFooter>
      </Card>
      </div>

      </div>
    );
  };
  
  export default NotificationBox;
  