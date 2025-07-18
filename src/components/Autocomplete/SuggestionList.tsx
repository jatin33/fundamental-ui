import type { Option } from "./types";
import "./Autocomplete.css";

type Props = {
    open: boolean;
    isLoading: boolean;
    isError: boolean;
    options: Option<string>[];
    activeIndex: number;
    onSelect: (option: Option<string>) => void;
};

function SuggestionList({ open, isLoading, activeIndex, isError, onSelect, options }: Props) {
    if (isLoading) {
        return <div role="status" aria-label="Loading" aria-live="polite" className="loader" >
            Loading...
        </div>
    }

    return open ? <ul id="autocomplete-suggestion-list" role="listbox" className="suggestion__list">
        {options.map((option, index) => {
            const isActive = activeIndex === index;
            return (<li role="option" id={`autocomplete-option-${index}`} className={`suggestion__item ${isActive ? "highlighted" : ""}`} key={`${option.value}-${index}`} onClick={() => {
                onSelect(option);
            }} aria-selected={isActive}>{option.label}</li>);
        })}
    </ul> : null;
}

export default SuggestionList;