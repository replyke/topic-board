import { useParams } from "react-router-dom";
import { useEntity, EntityProvider } from "@replyke/react-js";

import { LoaderCircleIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import CommentSection from "../../components/post-page/CommentSection";
import PostContent from "../../components/post-page/PostContent";

function PostPage() {
  const { entity } = useEntity();

  if (typeof entity === "undefined")
    return <LoaderCircleIcon className="size-6 animate-spin mx-auto my-4" />;

  if (entity === null)
    return <div className="text-center py-8">Post not found</div>;

  return (
    <Card className="py-0 overflow-hidden">
      <PostContent />
      <CommentSection />
    </Card>
  );
}

const WrappedPostPage = () => {
  const { postId: shortId } = useParams();

  return (
    <EntityProvider shortId={shortId}>
      <PostPage />
    </EntityProvider>
  );
};

export default WrappedPostPage;
