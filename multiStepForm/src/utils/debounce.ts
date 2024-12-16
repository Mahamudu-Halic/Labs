const useDebounce = (func: (...args: any[]) => void, timeout = 300) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: any[]) => {
    // Clear the existing timer
    clearTimeout(timer);

    // Set a new timer
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export default useDebounce;
