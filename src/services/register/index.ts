import axios from "axios";
import * as api from "../../api";
export const registerNewUser = async (formData: registerNewUser) => {
  try {
    const response = await api.registerNewUser(formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
