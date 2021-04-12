import axios from "axios";

const url = "https://ee461l-g11-backend.herokuapp.com/";

export const getHardwareSets = async () => {
    let changeableUrl = `${url}/api/hardware_set/DeepDream`;
    let csrf = document.getElementsByName("csrf-token")[0].content;
    try {
        const headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
        };
        const credentials = "same-origin";
        const result = await axios.get(changeableUrl, { headers }, { credentials });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
