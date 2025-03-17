import { useSearchParams } from "react-router-dom";
import {
  SocialStyleCallbacks,
  SocialStyleConfig,
  useSocialComments,
  useSocialStyle,
  UseSocialStyleProps,
} from "@replyke/comments-social-react-js";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEntity } from "@replyke/react-js";
import { useMemo } from "react";

function CommentSection() {
  const [searchParams] = useSearchParams();
  const { entity } = useEntity();

  const callbacks: SocialStyleCallbacks = {
    loginRequiredCallback: () => {
      toast("Please log in first");
    },
    commentTooShortCallback: () => {
      toast("Your comment is too short");
    },
  };

  const customStyleConfig = useMemo<Partial<UseSocialStyleProps>>(
    () => ({
      newCommentFormProps: {
        paddingRight: 16,
      },
    }),
    []
  );
  const styleConfig: SocialStyleConfig = useSocialStyle(customStyleConfig);

  const { CommentSectionProvider, CommentsFeed, NewCommentForm } =
    useSocialComments({
      entityId: entity?.id,
      callbacks,
      highlightedCommentId: searchParams.get("commentId"),
      styleConfig,
      limit: 10,
    });

  return (
    <CommentSectionProvider>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 bg-white">
          <CommentsFeed />
          <div className="w-full h-4" />
        </ScrollArea>
        <div className="border-t">
          <NewCommentForm />
        </div>
      </div>
    </CommentSectionProvider>
  );
}

export default CommentSection;
