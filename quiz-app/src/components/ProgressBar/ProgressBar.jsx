import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(5); // Initial progress value (0-100)

    // Calculate the background style dynamically
    const progressBarBackground = `linear-gradient(to right, #fff ${progress}%, #fff ${progress}%)`;

    const max = 10; // Maximum progress value (100%)

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10); // Get the new value from the range input
        setProgress(value); // Update the state
    };

    return (
        <div className="progressbar">
            <input
                // style={{background: progressBarBackground}}
                className="progressbar__input"
                type="range"
                min={0}
                max={max}
                value={progress}
                onChange={handleChange} // Update progress on change
            />
            <p>{progress}%</p> {/* Display the progress value */}
        </div>
    );
};

export default ProgressBar;
