const wildCast = {
  date: () => "string",
  "date-time": () => "string",
  integer: () => "number" | "string",
};

const primitiveTypeConstructs = (_struct) => ({
  ...wildCast,
  string: {
    ...wildCast,
  },
});

const hooks = {
  // onFormatTypeName: (_typeName, rawTypeName, _schemaType) => {
  //   return rawTypeName.replaceAll('.', '_')
  // },
};

module.exports = {
  primitiveTypeConstructs,
  hooks,
};
