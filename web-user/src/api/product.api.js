import axiosClient from "./axios.client";

export const getProduct = async () => {
  try {
    const response = await axiosClient.get("products/listProduct");

    return { response };
  } catch (err) {
    return { err };
  }
};

export const addProduct = async ({
  name,
  description,
  price,
  quantity,
  image,
  storeId,
  categoryId,
}) => {
  try {
    const response = await axiosClient.post("products/addProduct", {
      name,
      description,
      price,
      quantity,
      image,
      storeId,
      categoryId,
    });

    return { response };
  } catch (err) {
    return { err };
  }
};

export const updateProduct = async (
  productId,
  { name, description, price, quantity, image, storeId, categoryId }
) => {
  try {
    const response = await axiosClient.put(
      `products/updateProduct/${productId}`,
      {
        name,
        description,
        price,
        quantity,
        image,
        storeId,
        categoryId,
      }
    );

    return { response };
  } catch (err) {
    return { err };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosClient.delete(
      `products/deleteProduct/${productId}`
    );

    return { response };
  } catch (err) {
    return { err };
  }
};
