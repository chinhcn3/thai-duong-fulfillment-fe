import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    --ant-error-color: #f5222d;
  }
  
  body {
      margin: 0;
  }

  td.ant-table-column-sort {
    background-color: unset;
  }
  .ant-table-thead th.ant-table-column-sort {
    background-color: #fafafa;
  }
  .ant-table-placeholder > .ant-table-cell {
    border-bottom: none;
  }

  ::-webkit-scrollbar {
    background-color: rgb(255 255 255 / 10%);
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background-color: rgb(200 200 200 / 10%);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(200 200 200 / 30%);
    border-radius: 6px;
    border: 2px solid rgb(200 200 200 / 10%);
  }

  ::-webkit-scrollbar-track:hover {
    background-color: rgb(200 200 200 / 20%);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(200 200 200 / 50%);
  }

  #nprogress {
    .bar {
      border-bottom: 2px solid #1890ff;
    }

    .peg {
      box-shadow: 0 0 10px #f5f5f5, 0 0 5px #f5f5f5;
    }

    .spinner-icon {
      border-top-color: #f5f5f5;
      border-left-color: #f5f5f5;
    }
  }

  /* STICKY */
  .sticky-top {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .sticky-bottom {
    position: sticky;
    bottom: 0;
    z-index: 100;
  }

  /* FONT */
  body #__next {
    font-family: Roboto, 'Noto Sans JP', sans-serif;
    font-weight: 300;
    color: #333;
    h1, h2, h3, h4, h5, h6 {
      color: #333;
      font-weight: 500;
    }
    .ant-table-thead > tr > th {
      font-weight: 400;
    }
    .font-icon {
      vertical-align: text-bottom;
    }
    .ant-form-item-label {
      font-weight: 500;
    }
    .eui-wrapper {
      font-family: inherit;
      font-weight: inherit;
      color: inherit;
      font-size: inherit;
      line-height: inherit;
    }
  }
`
