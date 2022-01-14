import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StartRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);
    return (
        <div style={{ display: "inlineBlock", width: "300px" }}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            style={{ display: "none" }}
                            type="radio"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            color={
                                ratingValue <= (hover || rating)
                                    ? "#ffc107"
                                    : "#e4e5d9"
                            }
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StartRating;
