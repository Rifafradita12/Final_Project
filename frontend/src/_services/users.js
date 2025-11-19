import api from "../_api";

export function getUsers() {
    return api.get("/users");
}