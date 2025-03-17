import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useFeed } from "@replyke/react-js";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";
import { topics } from "../../constants/topics";

function NewPostModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { createEntity } = useFeed();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTag, setNewPostTag] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!topicId) {
      throw new Error("Couldn't find topic ID");
    }

    // Validate form
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostTag) {
      return;
    }

    setSubmitting(true);
    const newEntity = await createEntity?.({
      resource: "forum",
      title: newPostTitle,
      content: newPostContent,
      keywords: [newPostTag],
      metadata: {
        topicId,
      },
    });

    if (newEntity) {
      navigate(`/post/${newEntity.shortId}`);
    }

    // Reset form and close modal
    closeModal();
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTag("");
    setSubmitting(false);
  };

  const submittingEnabled =
    newPostTitle.trim() && newPostContent.trim() && newPostTag.trim();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(state) => {
        if (!state) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>
            Share your thoughts, questions, or ideas with the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreatePost}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Write your post content here..."
                className="min-h-[120px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tag">Tag</Label>
              <Select value={newPostTag} onValueChange={setNewPostTag} required>
                <SelectTrigger id="tag">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {topics
                    .find((topic) => topic.id === topicId)
                    ?.tags.map((t) => (
                      <SelectItem value={t} key={t}>
                        {t}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting || !submittingEnabled}>
              {submitting && (
                <LoaderCircleIcon className="size-4 mr-2 animate-spin" />
              )}
              {submitting ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewPostModal;
