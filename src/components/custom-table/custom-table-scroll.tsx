import React, {
  DependencyList,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Table, TableProps, message } from "antd";
import { TableStyles } from "@/components/custom-table/styles";
import axios, { AxiosResponse } from "axios";
import { ResponseData } from "@/schema/axios-reponse-data";
export interface Pagination<T> {
  total: number;
  data: T[];
}
interface CustomTableProps<T> {
  styles?: any;
  limit: number;
  height: number;
  tableProps: TableProps<T>;
  fetchData: (
    page: number,
    limit: number,
    status?: number,
    date?: string,
    name?: string
  ) => Promise<AxiosResponse<ResponseData<Pagination<T>>>>;
  deps?: DependencyList;
  filters?: any;
}
const InfiniteScrollTable = <T extends {}>({
  styles,
  limit,
  height,
  tableProps,
  fetchData,
  deps,
  filters,
}: CustomTableProps<T>) => {
  const pageRef = useRef<{ page: number; isLoadMore: boolean }>({
    page: 1,
    isLoadMore: true,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  const fetchDataApi = useCallback(async () => {
    if (!pageRef.current.isLoadMore || loading) return;
    setLoading(true);
    try {
      const response = await fetchData(
        pageRef.current.page,
        limit,
        filters?.status,
        filters?.date,
        filters?.searchName
      );
      if (response.data.statusCode === 200) {
        setData((prevData) =>
          pageRef.current.page === 1
            ? response.data.data.data
            : [...prevData, ...response.data.data.data]
        );
        pageRef.current.page += 1;
        if (response.data.data.data.length < limit) {
          pageRef.current.isLoadMore = false;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, filters, fetchData]);
  useEffect(() => {
    pageRef.current.page = 1;
    pageRef.current.isLoadMore = true;
    fetchDataApi();
  }, [...(deps || []), fetchDataApi]);
  const handleScroll = useCallback(
    (event: any) => {
      let maxScroll = event.target.scrollHeight - event.target.clientHeight;
      let currentScroll = event.target.scrollTop;
      if (currentScroll === maxScroll) {
        fetchDataApi();
      }
    },
    [fetchDataApi]
  );
  useEffect(() => {
    const tableContent = document.querySelector(".ant-table-body");
    if (tableContent) {
      tableContent.addEventListener("scroll", handleScroll);
      return () => tableContent.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);
  const tableScroll = useMemo(() => ({ y: height, x: height }), [height]);
  return (
    <TableStyles style={styles}>
      <Table
        dataSource={data}
        columns={tableProps.columns}
        loading={loading}
        pagination={false}
        rowKey="id"
        {...tableProps}
        scroll={tableScroll}
      />
    </TableStyles>
  );
};

export default InfiniteScrollTable;
