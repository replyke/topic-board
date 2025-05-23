import { toast } from "sonner";
import { useMemo, useState } from "react";
import {
  handleError,
  ReportReasonKey,
  reportReasons,
  useUser,
  useCreateReport,
  useEntity,
} from "@replyke/react-js";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FlagIcon, LoaderCircleIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const ReportPostSheet = ({
  setShowReportPostDialog,
}: {
  setShowReportPostDialog: (show: boolean) => void;
}) => {
  const { user } = useUser();
  const { entity } = useEntity();
  const { createEntityReport } = useCreateReport();

  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState<ReportReasonKey | null>(null);

  const buttonActive = useMemo(() => !!reason && !!entity, [reason, entity]);

  const handleSubmitReport = async () => {
    try {
      if (!entity) throw new Error("No entity to report selected");
      if (!reason) throw new Error("No reason to report selected");
      if (!user) {
        toast("Oops! Login Required");
        return;
      }

      setSubmitting(true);
      await createEntityReport({ targetId: entity.id, reason });
      setShowReportPostDialog(false);
      setReason(null);
      toast.success("Report submitted successfully");
    } catch (err) {
      handleError(err, "Submitting report failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <FlagIcon className="size-5 mr-2" />
          Submit a report
        </DialogTitle>
        <DialogDescription>
          Thank you fo looking out for our community. Let us know what is
          happening, and we'll look into it.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row flex-wrap gap-1.5 mt-2">
        {Object.entries(reportReasons).map(([key, value], index) => (
          <Button
            onClick={() => setReason(key as ReportReasonKey)}
            size="sm"
            variant="secondary"
            className={cn(
              "px-2 py-1 text-xs",
              key === reason
                ? "bg-stone-800 hover:bg-stone-800 text-white"
                : "bg-secondary hover:bg-secondary"
            )}
            key={index}
          >
            {value}
          </Button>
        ))}
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setShowReportPostDialog(false)}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleSubmitReport}
          disabled={!buttonActive}
        >
          {submitting && (
            <LoaderCircleIcon className="size-4 mr-2 animate-spin" />
          )}
          {submitting ? "Submitting..." : "Submit Report"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ReportPostSheet;
