import { useState } from "react";
import { EntityProvider, FeedProvider, useFeed } from "@replyke/react-js";
import { LoaderCircleIcon } from "lucide-react";
import { PostRow } from "../components/topic-page/PostRow";
import ActionsBar from "../components/topic-page/ActionsBar";
import NewPostModal from "../components/topic-page/NewPostModal";
import { useParams } from "react-router-dom";
import { topics } from "../mock-data";

function InnerTopicPage() {
  const { topicId } = useParams();
  const { entities, resetting } = useFeed();

  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-4">
      <NewPostModal
        isOpen={isNewPostModalOpen}
        closeModal={() => setIsNewPostModalOpen(false)}
      />

      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">
          {topics.find((topic) => topic.id === topicId)?.title}
        </h1>
      </div>

      {/* Actions Bar */}
      <ActionsBar openNewPostModal={() => setIsNewPostModalOpen(true)} />

      {/* Posts List */}
      {resetting ? (
        <LoaderCircleIcon className="size-6 animate-spin mx-auto my-4" />
      ) : (entities || []).length > 0 ? (
        <div className="flex flex-col border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200">
          {entities?.map((entity) => (
            <EntityProvider entity={entity} key={entity.id}>
              <PostRow />
            </EntityProvider>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-3xl p-4 font-bold">
          No Posts Yet
        </p>
      )}
    </div>
  );
}

export default function TopicPage() {
  const { topicId } = useParams();

  return (
    <FeedProvider
      resource="forum"
      metadataFilters={{
        includes: {
          topicId,
        },
      }}
    >
      <InnerTopicPage />
    </FeedProvider>
  );
}
