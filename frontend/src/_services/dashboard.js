import api from "../_api";

export function getDashboard() {
    return api.get("/dashboard");
}