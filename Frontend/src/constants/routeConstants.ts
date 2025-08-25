const BASE="api/auth"
const PVT_BASE="api/private"
export const AUTH_ROUTES={
    REGISTER:`/${BASE}/register`,
    LOGIN: `/${BASE}/login`,
    LOGOUT: `/${BASE}/logout`
}

export const PRIVATE_ROUTES = {
    GET_FILE: `/${PVT_BASE}/`,
    GET_FOLDER: `/${PVT_BASE}/folders`,
    UPLOAD: `/${PVT_BASE}/upload`,
    ADD_FOLDER: `/${PVT_BASE}/folders`,
    DOWNLOAD_FILE: (id: string) => `/${PVT_BASE}/download/${id}`,
    DELETE_FILE: (id: string) => `/${PVT_BASE}/${id}`,
};