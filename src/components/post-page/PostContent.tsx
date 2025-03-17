import { useState } from "react";
import { getUserName, useEntity } from "@replyke/react-js";
import { UserAvatar } from "@replyke/ui-core-react-js";

import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PostRowVotes from "@/components/topic-page/PostRow/PostRowVotes";
import { getTimeAgo } from "../../lib/timeAgo";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import OptionsDropdown from "@/components/post-page/OptionsDropdown";
import { LoaderCircleIcon } from "lucide-react";

function PostContent() {
  const { entity, updateEntity } = useEntity();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!entity) return null;

  const handleEdit = () => {
    setEditTitle(entity.title || "");
    setEditContent(entity.content || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!updateEntity) return;
    setIsSaving(true);
    await updateEntity({
      update: {
        title: editTitle,
        content: editContent,
      },
    });
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <div className="flex border-b">
      <PostRowVotes />
      <div className="flex-1 py-4">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4 w-full">
            <UserAvatar user={entity.user!} size={32} />
            <div className="flex-1">
              <span className="text-sm font-medium hover:underline cursor-pointer">
                u/{getUserName(entity.user!, "username")}
              </span>
              <div className="text-xs text-gray-500">
                {getTimeAgo(new Date(entity.createdAt))}
              </div>
            </div>
            {!isEditing && (
              <div className="flex gap-2">
                {entity.keywords.map((k) => (
                  <Badge variant="secondary" key={k}>
                    {k}
                  </Badge>
                ))}
              </div>
            )}
            {!isEditing && <OptionsDropdown handleEdit={handleEdit} />}
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Content"
                className="min-h-[200px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving && <LoaderCircleIcon className="size-4 mr-2" />}
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <CardTitle className="text-2xl">{entity.title}</CardTitle>
          )}
        </CardHeader>
        {!isEditing && (
          <CardContent className="mt-2">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {entity.content}
            </p>
          </CardContent>
        )}
      </div>
    </div>
  );
}

export default PostContent;
