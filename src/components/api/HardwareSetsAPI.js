import useToken from "../hook/useTokenHook.js";

//const url = "http://localhost:5555/";
const url = "https://flask-backend-ee461l.herokuapp.com/"

// API call to login
async function getSetAPICall(set_name, getToken) {
    let changeableUrl = `${url}api/hardware_set/find`;
    console.log("URL formed : ", changeableUrl)
    return fetch(changeableUrl, {
        method: 'POST',
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'X-CSRFToken': getToken()
        },
        credentials: "same-origin",
        body: JSON.stringify({ "set_name": set_name })
    })
        .then(data => data.json())
}

export default function HardwareSetsAPI(props) {
    const { token, setToken, deleteToken, getToken } = useToken();

    /*
    const fillArr = async (set_name) => {
        const hardware_set = await getSetAPICall(set_name);
        console.log("Set name : ", set_name);
        console.log("Hardware set : ", hardware_set);
        props.addHardwareSet(hardware_set);
    };
    */

    /*
    const getHardwareSets = () => {
        props.set_names.forEach(fillArr);
    };
    */

    const getHardwareSets = async () => {
        const allAsyncResults = []

        for (const set_name of props.set_names) {
            const hardware_set = await getSetAPICall(set_name, getToken);
            allAsyncResults.push(hardware_set)
        }

        for (const hardware_set of allAsyncResults) {
            props.addHardwareSet(hardware_set);
        }

        console.log("All async api calls complete!")
    }

    /*
    const getHardwareSets = async () => {
        const promises = props.set_names.map(fillArr)
        await Promise.all(promises)
        console.log(`All async tasks complete!`)
    }
    */

    return (getHardwareSets);
}
