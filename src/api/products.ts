type Product = {
  id: string;
  title: string;
  price: number;
  checked?: boolean;
};

const API_URL = 'http://localhost:3000';

const fetchProducts = async (): Promise<Array<Product>> => {
  const resp = await fetch(`${API_URL}/products`);
  return await resp.json();
};

const fetchProduct = async (id: string): Promise<Product> => {
  const resp = await fetch(`${API_URL}/products/${id}`);

  if (!resp.ok) {
    throw new Error(`Product with id ${id} not found`);
  }
  return await resp.json();
};

const addProduct = async (data: Product) => {
  const resp = await fetch(`${API_URL}/products`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await resp.json();
};

const updateProduct = async ({ id, data }: { id: string; data: Partial<Product> }) => {
  const resp = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return await resp.json();
};

const deleteProduct = async (id: string) => {
  const resp = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return await resp.json();
};

export default {
  fetchProducts,
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
