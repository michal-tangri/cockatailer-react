import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchEngine({ onChange = f => f }) {
    const content = useRef();
    const checkbox = useRef();

    return (
        <>
            <h1><FaSearch style={{fontSize: "26px", marginTop: "-6px"}} />&nbsp;Search for a cocktail</h1>
            <input ref={content} className="form-control search-engine" type="text" placeholder="Enter the name of a cocktail..."
                onChange={() => onChange(content.current.value, checkbox.current.checked)} />
                <br />
            <label><input ref={checkbox} type="checkbox" onChange={() => onChange(content.current.value, checkbox.current.checked)} />&nbsp;Search only non-alcoholic cocktails</label>
        </>
    );
} 