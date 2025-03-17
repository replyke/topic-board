import { useState } from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";

import { Button } from "../../components/ui/button";
import { useEntity, useUser } from "@replyke/react-js";
import DeletePostDialog from "./DeletePostDialog";
import ReportPostDialog from "./ReportPostDialog";

function OptionsDropdown({ handleEdit }: { handleEdit: () => void }) {
  const { entity } = useEntity();
  const { user } = useUser();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReportPostDialog, setShowReportPostDialog] = useState(false);

  if (!entity) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Post Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user && entity.user?.id !== user.id && (
            <DropdownMenuItem>Report</DropdownMenuItem>
          )}
          {user && entity.user?.id === user.id && (
            <>
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteConfirm(true)}>
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DeletePostDialog setShowDeleteConfirm={setShowDeleteConfirm} />
      </Dialog>
      <Dialog
        open={showReportPostDialog}
        onOpenChange={setShowReportPostDialog}
      >
        <ReportPostDialog setShowReportPostDialog={setShowReportPostDialog} />
      </Dialog>
    </>
  );
}

export default OptionsDropdown;
