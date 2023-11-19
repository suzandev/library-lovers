// Reuseable try catch
export default function catchAsync(fn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error(error.response);
      }
      throw new Error(error.response.data.message || error.response.data);
    }
  };
}
