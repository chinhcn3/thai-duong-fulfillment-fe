import styled from "styled-components";

export const TaskComponentStyles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;
export const HomePageStyles = styled.div`
  .report-day {
    color: #27221e;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 16px;
    span {
      margin-right: 16px;
    }
  }
`;
export const TaskContainerStyles = styled.div`
  .tasks {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    color: #27221e;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .search {
    .ant-input-group-addon {
      background-color: #fff;
      border: none;
    }
    .ant-input {
      border: none;
    }
    .ant-input::placeholder {
      font-size: 14px; /* Kích thước phông chữ mong muốn */
    }
    .ant-input:focus {
      outline: none;
      box-shadow: none;
    }
    .ant-input:hover {
      border-color: transparent !important;
    }
  }
`;
