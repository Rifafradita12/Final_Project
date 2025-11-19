import api from "../_api";

export function getDenda() {
    return api.get("/denda");
}
