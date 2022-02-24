export function debounce<T extends Function>(cb: T, wait: number = 10) {
  let handle: ReturnType<typeof setTimeout>;
  const callable = (...args: any) => {
    clearTimeout(handle);
    handle = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}


export function browserDebounce<F extends Function>(func: F, wait = 10):F {
  let timeoutID:number;

  // Conversion through any necessary as it won't satisfy criteria otherwise
  return <any>function(this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this;

    timeoutID = window.setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}
