
type Props = {
    ref: React.Ref<HTMLInputElement>;
    value: string;
    className?: string;
    activeIndex: number;
    listOpen: boolean;
    onChange: (text: string) => void;
};

function Input({ ref, value, activeIndex, className, listOpen, onChange }: Props) {
    return <input
        ref={ref}
        value={value}
        type="search"
        aria-label="Search for any option"
        className={className}
        placeholder="Search for an option"
        onChange={(e) => {
            onChange(e.target.value);
        }}
        aria-controls={listOpen ? "autocomplete-suggestion-list": undefined}
        aria-activedescendant={activeIndex !== -1 ? `autocomplete-option-${activeIndex}`: undefined}
    />
}

export default Input;