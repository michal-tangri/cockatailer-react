import React from "react";
import Star from "./Star";

const createArray = length => [...Array(length)];

export default function StarRating({totalStars = 5, selectedStars = 0, setSelectedStars = f => f}) {
    
    return (
        <div style={{ padding: 5,}}>
            {createArray(totalStars).map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => setSelectedStars(i + 1)}
                />
            ))}
            <p>
                {selectedStars} of {totalStars} stars
            </p>
        </div>
    );
}