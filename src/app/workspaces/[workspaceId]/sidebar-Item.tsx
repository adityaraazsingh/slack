import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5  font-normal h-7 px-[18px]  overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

export const SidebarItem = ({
  label,
  id,
  icon: Icon,
  variant,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex justify-between w-full ">
      <Button
        variant="transparent"
        size="sm"
         className={cn(
           sidebarItemVariants({
             variant: variant,
           })
        )}
       
        
      >
        <Link href={`/workspaces/${workspaceId}/channel/${id}`} className="flex ">
        <Icon className="size-5 shrink-0 mr-1 " />
        <span className="text-sm truncate">{
        label
        }</span>
        </Link>
      </Button>
    </div>
  );
};
