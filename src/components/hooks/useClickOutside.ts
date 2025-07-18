import { useEffect } from "react";


function useClickOutside(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref && ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
}

export default useClickOutside;