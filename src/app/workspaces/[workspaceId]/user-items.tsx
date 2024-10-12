import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Id } from "../../../../convex/_generated/dataModel";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const userItemVariants = cva(
  "flex items-center gap-1.5  font-normal h-7 px-4  overflow-hidden",
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

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
}

export const UserItem = ({
  id,
  label = "Member",
  image,
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label.charAt(0).toUpperCase();

  return (
    <Button
      variant="transparent"
      className={cn(userItemVariants({ variant: variant }))}
      size="sm"
    >
      <Link href={`/worspaces/${workspaceId}/member/${id}`}>
      <div className="flex">

        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage className="rounded-md " src={image} />
          <AvatarFallback
            className="rounded-sm
                    bg-sky-500 text-white text-xs"
          >
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate ">{label}</span>
      </div>
      </Link>
    </Button>
  );
};
