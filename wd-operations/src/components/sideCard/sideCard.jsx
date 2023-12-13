import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "../ui/card";
import { SideButton } from "../ui/sidebar/sidebutton";
import { SideSeparator} from "../ui/sidebar/sideseparator";

const SideCard = () => {

  const handleClick = async () => {
    console.log("Open New Schedule Modal")
  }

  return (
    <div className="py-2 pl-2 pr-4">
      <Card className="bg-gradient-to-tr border-white/20 border-hidden from-[#020817] to-[#030b21] border shadow-xl hover:bg-gradient-to-br hover:from-[#040f2b] hover:to-[#020817] transition-all ease-in-out scale-105 duration-500">
        <CardContent className="py-4 border-hidden">
          <div className="text-center text-sm text-white mb-4 font-medium space-y-1">
            <p>
              Add to Schedule
            </p>
            <SideSeparator />
          </div>
          <SideButton onClick={handleClick} className="w-full" >
            <Plus className="w-4 h-4 ml-1 mr-2 fill-white" />
          </SideButton>
        </CardContent>
      </Card>
    </div>
  )
}

export { SideCard }