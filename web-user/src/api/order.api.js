import axiosClient from "./axios.client";

export const getOrder = async () => {
  try {
    const response = await axiosClient.get("orders/listOrders");

    return { response };
  } catch (err) {
    return { err };
  }
};

export const confirmDelivery = async (id) => {
  try {
    const response = await axiosClient.post(`orders/confirmDelivery/${id}`);

    return { response };
  } catch (err) {
    return { err };
  }
};
