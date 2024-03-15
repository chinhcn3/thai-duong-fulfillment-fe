// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  components: {
    DatePicker: {
      /* here is your component tokens */
      presetsWidth: 400,
    },
    Input: {
      /* here is your component tokens */
      inputFontSize: 14,
    },
  },
  token: {
    fontSize: 16,
    colorPrimary: "#1890ff",
    fontFamily: "SVN-Poppins",
  },
};

export default theme;
