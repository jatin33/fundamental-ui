import { useCallback, useRef } from "react";

type AnyFunction = (...args: any[]) => void;

function useDebounce<T extends AnyFunction>(
    fn: T,
    delay: number
) {
    const timerRef = useRef<number | null>(null);

   const debouncedCallback = useCallback(function(...args: any[]){
    const context = this;

    if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
        fn.call(context, ...args);
    }, delay);
   }, [fn, delay]);

   return debouncedCallback;
}

export default useDebounce;