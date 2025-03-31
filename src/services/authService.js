import api from "./api";

export const registerUser = async (email, username, password, fullname) => {
    try {
        const response = await api.post("/registro", { 
            usuario: username,
            correo: email,
            contra: password,
            nombre: fullname
        });
        if (response.data.mfaSetup) {
            return {
                ...response.data,
                mfaSetup: response.data.mfaSetup
            };
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.intMessage || "Error en el registro. Intente nuevamente.";
    }
};

export const setupMFA = async (username, token) => {
    try {
        const response = await api.post("/verify-mfa", {
            username,
            token
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.intMessage || "Error al configurar MFA";
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post("/acceso", { usuario: username, contra: password });
        
        if (response.data.requiresMFA) {
            return {
                requiresMFA: true,
                tempToken: response.data.tempToken
            };
        }
        
        if (response.data && response.data.token && response.data.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("usuario", username);
            localStorage.setItem("rol", response.data.data.rol);
            return response.data;
        } else {
            throw new Error("Respuesta de inicio de sesión inválida");
        }
    } catch (error) {
        throw error.response?.data?.intMessage || "Error en el inicio de sesión";
    }
};

export const verifyMFA = async (tempToken, mfaToken) => {
    try {
        const response = await api.post("/acceso-mfa", { 
            tempToken, 
            mfaToken 
        });
        
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("usuario", response.data.data.username);
            localStorage.setItem("rol", response.data.data.rol);
            return response.data;
        }
        throw new Error("Respuesta MFA inválida");
    } catch (error) {
        throw error.response?.data?.intMessage || "Error en verificación MFA";
    }
};

export const requestPasswordRecovery = async (username) => {
    try {
        const response = await api.post("/solicitar-recuperacion", { usuario: username });
        return response.data;
    } catch (error) {
        throw error.response?.data?.intMessage || "Error al solicitar recuperación";
    }
};

export const verifyRecoveryCode = async (username, code) => {
    try {
        const response = await api.post("/verificar-recuperacion", { 
            usuario: username,
            token: code
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.intMessage || "Error al verificar código";
    }
};

export const changePasswordWithToken = async (token, newPassword) => {
    try {
        const response = await api.post("/cambiar-contrasena", { 
            token,
            nuevaContra: newPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.intMessage || "Error al cambiar contraseña";
    }
};

export const getUserData = async (userId) => {
    try {
        const response = await api.get(`/usuarios/${userId}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data?.intMessage || "Error al obtener los datos del usuario";
    }
};

export const updateUserProfile = async (userId, updatedData) => {
    try {
      const response = await api.put(`/users/${userId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.intMessage || "Error al actualizar el perfil";
    }
  };

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    //localStorage.removeItem("rol");
};
