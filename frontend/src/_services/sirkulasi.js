import api from "../_api";

export function getSirkulasi() {
    return api.get("/sirkulasi");
}
