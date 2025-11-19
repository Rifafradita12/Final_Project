import api from "../_api";

export function getKategori() {
    return api.get("/kategori");
}
