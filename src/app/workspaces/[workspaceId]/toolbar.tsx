import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-worspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {Search, Info } from "lucide-react";

export const Toolbar =()=>{

    const workspaceId = useWorkspaceId();
    const {data}= useGetWorkspace({id :workspaceId})

    return(
        <nav className="bg-[#481493]
        flex items-center justify-center h-10 p-1.5">
          <div className="flex-1">
            <div className="w-full flex items-center justify-center min-w-[280px]  ">
                <Button 
                size="sm" className=" bg-accent/25 hover:bg-opacity-10 w-1/2  justify-start h-7 "
                variant="transparent">
                <Search className="size-4 text-white text-xs"/>

                <span className="text-white text-xs  ">
                    Search workspace " {data?.name} "
                </span>
                </Button>


                <div className="ml-auto flex-1 flex items-center justify-end">
                    <Button variant="transparent" size="iconsm">
                        <Info className="size-5 text-white"/>
                    </Button>
                </div>
            </div>

          </div>
        </nav>
    );

}