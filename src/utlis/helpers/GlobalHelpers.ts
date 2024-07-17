export const getAssetVersion = () => {
    const date = new Date();
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const hour = date.toLocaleString("default", {
        hourCycle: "h24",
        hour: "numeric",
    });
    return "" + year + month + day + hour;
};

export const getParamsUrl = (key:string) => {
    const params = new URLSearchParams(document?.location.search);
    return params.get(key);
}