import React from "react";
import { Table, TableProps } from "antd";
import { TableStyles } from "@/components/custom-table/styles";
import { RefTable } from "antd/es/table/interface";

interface CustomTableProps {
  styles?: any;
  tableProps: TableProps<any>;
}
const CustomTable: React.FC<CustomTableProps> = (props) => {
  return (
    <TableStyles >
      <Table {...props.tableProps} />
    </TableStyles>
  );
};

export default CustomTable;
