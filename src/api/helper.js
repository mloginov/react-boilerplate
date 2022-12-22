export const stall = async (stallTime = 3000) => {
  return new Promise((resolve) => setTimeout(resolve, stallTime));
};
