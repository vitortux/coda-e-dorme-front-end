import { api } from "@/service/api";

export async function getProdutos(page: number = 0, size: number = 10) {
  try {
    const response = await api.get(`/api/produtos?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const response = await api.get(`/api/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}
