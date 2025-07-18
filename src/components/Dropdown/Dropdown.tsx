import React, { useEffect, useRef, useState } from 'react';

import "./dropdown.css";

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Array<Option>;
    children: React.ReactNode;
    onChange: (option: Option) => void;
};

/**
 * 
 * label - on which we trigger dropdown (can be considered as children)
 * trigger - hover, click
 * options - to render list of items
 * onChange - when something clicked from list options
 * renderOption - to custom render the option
 */
function Dropdown({
    options,
    children,
    onChange
}: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // when we click outside the dropdown container, it should close the dropdown
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);

        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent bubbling to parent
        setOpen((prev) => !prev); // Toggle dropdown
    }; 

    return <div ref={dropdownRef} onClick={handleContainerClick} className='dropdown__container'>
        {/* label */}
        <div className='dropdown__label'>{children}</div>
        {/* listbox */}
        {open ? (
            <ul className='dropdown__list'>
                {options.map((option) => <li className='dropdown__item' onClick={() => {
                    onChange(option)
                    setOpen(false);
                }}>{option.label}</li>)}
            </ul>
        ) : null}
    </div>
}

export default Dropdown;