import { DocDataType } from "@/controllers/cap-formato.controller";

export const createCustomer = async (data: DocDataType) => {
  try {
    const response = await fetch('/api/createCustomer', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error("Erro ao registrar!");
    }

  } catch (error: any) {
    throw new Error(error.message);
  }
}