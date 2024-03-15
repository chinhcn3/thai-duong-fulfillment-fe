import { StatusText } from "@/components/status-text/status-text-component";
import { StatusTask } from "@/schema";

export const generateTaskStatus = (deadline: any, status: StatusTask) => {
  switch (status) {
    case StatusTask.Working:
      return <StatusText status={status} title="Đang tiến hành" />;

    case StatusTask.Init:
      return <StatusText status={status} title="Khởi tạo" />;

    case StatusTask.Completed:
      return <StatusText status={status} title="Đã hoàn tất" />;

    case StatusTask.Over:
      return <StatusText status={status} title="Đã quá hạn" />;

    default:
      return <StatusText status={status} title="" />;
  }
};
