import api from "./api";

export const registerColeccionables = async (formData) => {
    try {
        const response = await api.post("/registroColeccionables", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error en el registro. Intente nuevamente.";
    }
};

export const colecciones = async (escala) => {
    try {
        const response = await api.get(`/colecciones?escala=${escala}`); // Enviar escala como parámetro de consulta
        console.log("Respuesta del backend:", response.data);
        if (response.data) {
            return response.data.data; // Retornar solo los datos de los coleccionables
        } else {
            throw new Error("Respuesta de inicio de sesión inválida");
        }
    } catch (error) {
        throw error.response?.data?.intMessage || "Error al obtener los coleccionables";
    }
};