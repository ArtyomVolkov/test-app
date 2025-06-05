import './NewProduct.css';

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import productsApi from '@/api/products';
import type { Product } from '@/shared/types/product';
import ProductForm from '@/shared/components/forms/ProductForm';

const NewProduct = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: productsApi.addProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Create products success');
    },
  });

  const onSubmit = async (product: Partial<Product>) => {
    await addMutation.mutate({
      id: Date.now().toString(),
      title: product.title || '',
      price: product.price || 0,
    });
    navigation('/products');
  };

  return (
    <div className="new-product-page">
      <h1>New Product</h1>
      <ProductForm onSubmit={onSubmit} formData={{}} />
    </div>
  );
};

export default NewProduct;
