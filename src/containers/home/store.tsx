import { FORMAT_DATE } from "@/constants";
import { StatusTask } from "@/schema";
import { TasksService } from "@/swagger-api";
import { initAsyncSlice } from "@/zustand/init-async-slice";
import dayjs from "dayjs";
import { produce } from "immer";

type TaskFilter = {
  page?: number;
  date?: any;
  status?: StatusTask[];
  searchName?: string;
};

const initData: any = {
  filters: {
    page: 1,
    date: dayjs().format(FORMAT_DATE),
    status: [
      StatusTask.Init,
      StatusTask.Completed,
      StatusTask.Over,
      StatusTask.Working,
    ],
    searchName: "",
  },

  tasks: [],
};

export const storeHome = initAsyncSlice("TSK-list", initData);

export const setFilters = (filters: TaskFilter) => {
  storeHome.setData((data: any) =>
    produce(data, (draft: any) => {
      draft.filters = { ...draft.filters, ...filters };
    })
  );
};
