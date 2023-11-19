// Reuseable try catch
export default function catchAsync(fn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
}
