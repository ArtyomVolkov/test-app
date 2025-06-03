import Http from '@/services/http';

type Product = {
  id: string;
  title: string;
  price: number;
  checked?: boolean;
};

const fetchProducts = async (): Promise<Array<Product>> => {
  const resp = await Http.get(`/products`);
  return resp.data;
};

const fetchProduct = async (id: string): Promise<Product> => {
  const resp = await Http.get(`/products/${id}`);
  return resp.data;
};

const addProduct = async (data: Product) => {
  const resp = await Http.post(`/products`, data);
  return resp.data;
};

const updateProduct = async ({ id, data }: { id: string; data: Partial<Product> }) => {
  const resp = await Http.patch(`/products/${id}`, data);
  return resp.data;
};

const deleteProduct = async (id: string) => {
  const resp = await Http.delete(`/products/${id}`);
  return resp.data;
};

export default {
  fetchProducts,
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
