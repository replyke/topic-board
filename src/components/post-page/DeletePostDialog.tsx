import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEntity } from "@replyke/react-js";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

function DeletePostDialog({
  setShowDeleteConfirm,
}: {
  setShowDeleteConfirm: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const { entity, deleteEntity } = useEntity();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteEntity) return;
    setDeleting(true);
    await deleteEntity();
    setShowDeleteConfirm(false);
    navigate("/topics/" + entity?.metadata.topicId);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setShowDeleteConfirm(false)}
          disabled={deleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting && <LoaderCircleIcon className="size-4 mr-2" />}
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default DeletePostDialog;
