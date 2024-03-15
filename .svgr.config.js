module.exports = {
  svgoConfig: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
  },
  svgProps: {
    stroke: "currentColor",
  },
};
