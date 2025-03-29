// services/bidService.js
import api from "./api";

export const getLatestBid = async (itemId) => {
  try {
    const response = await api.get(`/bids/${itemId}/latest`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.intMessage || "Error al obtener última puja";
  }
};

export const placeBid = async (itemId, amount) => {
  try {
    const response = await api.post("/bids", {
      itemId,
      amount: Number(amount)
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.intMessage || "Error al realizar puja";
  }
};

export const getItemBids = async (itemId) => {
  try {
    const response = await api.get(`/bids/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.intMessage || "Error al obtener historial de pujas";
  }
};