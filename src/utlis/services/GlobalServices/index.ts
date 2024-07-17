import { API_KEY, API_URL } from "../../constants/config";
import { getParamsUrl } from "../../helpers/GlobalHelpers";


export const FetchGames = async () => {
    const id = getParamsUrl('event_id');
    const tokenQ = getParamsUrl('q');
    const url = API_URL + id + `?limit=${10}&page=${1}`
    const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            apiKey: API_KEY,
            Authorization: `${tokenQ}`,
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Failed to post data");
    }
};
