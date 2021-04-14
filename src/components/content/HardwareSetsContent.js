import { useState, useEffect } from "react";

import HardwareSetCard from "../card/HardwareSetCard.js";
import HardwareSetsAPI from "../api/HardwareSetsAPI.js"


function HardwareSetContent(props) {
    console.log("Rerender of hardware set content");
    const [hardware_sets, setHardwareSets] = useState([]);
    console.log("In content, sets ", hardware_sets);
    console.log("a set, ", hardware_sets["0"])

    // handle click event of the button to add item
    const addHardwareSet = (dict) => {
        setHardwareSets(prevItems => [...prevItems, dict]);
    }

    const set_names = ["DeepDream", "PacMan", "TheTiny"];

    const getHardwareSets = HardwareSetsAPI({
        "set_names": set_names,
        "addHardwareSet": addHardwareSet
    });

    useEffect(() => {
        getHardwareSets();
    }, [])

    return (
        <div>
            {hardware_sets.map((hardware_set, index) => (
                <div className="column" key={index}>
                    <HardwareSetCard
                        key={hardware_set}
                        hardware_set_name={hardware_set.hardware_set_name || ""}
                        availability={hardware_set.availability || 0}
                        description={hardware_set.description || ""}
                    />
                </div>
            ))}
        </div>
    );
}

export default HardwareSetContent;
