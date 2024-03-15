export const parseData = (data: any, page: number, limit: number) => {
  return {
    ...data,
    data: data.data.map((item: any, index: number) => {
      return { ...item, stt: index + 1 + (page - 1) * limit };
    }),
  };
};
