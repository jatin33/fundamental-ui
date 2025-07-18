

import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import type { Option } from "./types";
import useDebounce from "../hooks/useDebounce";
import SuggestionList from "./SuggestionList";
import "./Autocomplete.css";
import useClickOutside from "../hooks/useClickOutside";

// Input field for typing

// Fetch suggestions from a mock API with debounce

// Show loading indicator while fetching

// Render dropdown with fetched results

// Handle click on a suggestion and notify parent via onSelect

// Handle no-results and error state rendering

// Keyboard navigation (Up/Down/Enter, Esc closes list)

// Basic ARIA roles for accessibility

type Props = {
    url: string;
    onSelect: (option: Option<string>) => void;
};

const cache: Map<string, Array<Option<string>>> = new Map();

function Autocomplete({ url, onSelect }: Props) {
    const [searchString, setSearchString] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [options, setOptions] = useState<Option<string>[]>([]);
    const [shouldOpen, setShouldOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    async function fetchItems(query: string) {
        try {
            if (query === "") {
                setOptions([]);
                return;
            }

            if (cache.has(query)) {
                setOptions(cache.get(query) ?? []);
                return;
            }

            setIsLoading(true);
            const response = await fetch(`${url}?q=${query}`);
            const json = await response.json();
            const { data } = json;
            const { items } = data;

            const optionsData = items?.map((item) => ({
                label: item.name,
                value: item.name
            }));

            setOptions(optionsData);
            cache.set(query, optionsData);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const canOpen = options.length > 0 && !isLoading;
        setShouldOpen(canOpen);
    }, [options.length, isLoading]);

    useEffect(() => {
        const handleFocus = (e) => {
            setShouldOpen(true);
        }

        if (inputRef && inputRef.current) {
            inputRef.current.addEventListener("focus", handleFocus)
        }

        return () => {
            if (inputRef && inputRef.current) {
                inputRef.current.removeEventListener("focus", handleFocus);
            }
        }
    }, []);

    useEffect(() => {
        if (!shouldOpen) return;

        const handleKeyDown = (e) => {
            const key = e.key;

            switch(key) {
                case "ArrowUp":
                    setActiveIndex((idx) => (idx - 1 + options.length) % options.length);
                 break;
                case "ArrowDown":
                    setActiveIndex((idx) => (idx + 1) % options.length);
                    break;
                case "Escape":
                    setActiveIndex(-1);
                    setShouldOpen(false);
                    break;
                case "Enter":
                    const selectedOption = options[activeIndex];
                    setActiveIndex(-1);
                    setShouldOpen(false);
                    if (selectedOption) {
                        onSelect(selectedOption);
                        setSearchString(selectedOption.label)
                    }
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [shouldOpen, options, activeIndex]);

    const debouncedCallback = useDebounce((query: string) => {
        fetchItems(query)
    }, 400);

    // make it work like a normal dropdown
    // when clicked outside close the suggestion list
    // when input in focus again open the dropdown again
    useClickOutside(containerRef, () => {
        setShouldOpen(false);
        setActiveIndex(-1);
    });


    return <div role="combobox" aria-expanded={shouldOpen} aria-controls="autocomplete-suggestion-list" ref={containerRef} className="container">
        <Input
            value={searchString}
            onChange={(text) => {
                setSearchString(text);
                debouncedCallback(text);
            }}
            ref={inputRef}
            activeIndex={activeIndex}
            listOpen={shouldOpen}
        />
        <SuggestionList
            open={shouldOpen}
            options={options}
            isError={isError}
            isLoading={isLoading}
            activeIndex={activeIndex}
            onSelect={(option) => {
                onSelect(option);
                setShouldOpen(false);
                setSearchString(option.label)
            }}
        />
    </div>
}

export default Autocomplete;