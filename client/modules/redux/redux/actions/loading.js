
export const ADDLOADING = 'ADDLOADING';
export function addLoading(symbol) {
  return {
    type: ADDLOADING,
    symbol,
  };
}

export const REMOVELOADING = 'REMOVELOADING';
export function removeLoading(symbol) {
  return {
    type: REMOVELOADING,
    symbol,
  };
}
