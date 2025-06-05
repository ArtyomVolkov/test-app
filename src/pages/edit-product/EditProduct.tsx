import './EditProduct.css';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import productsApi from '@/api/products';
import ProductForm from '@/shared/components/forms/ProductForm';
import type { Product } from '@/shared/types/product';
import { useEffect } from 'react';

const EditProduct = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const params = useParams();

  const productQuery = useQuery({
    queryKey: ['products', params.id],
    queryFn: async () => {
      return await productsApi.fetchProduct(params.id as string);
    },
  });

  useEffect(() => {
    if (!productQuery.isLoading && !productQuery.data) {
      toast.error('Product not found');
      navigation('/products');
    }
  }, [productQuery.isLoading, productQuery.data]);

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; data: Partial<Product> }) => {
      return await productsApi.updateProduct(data);
    },
    onSuccess: async () => {
      navigation('/products');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product update success');
    },
  });

  const onSubmit = async (product: Partial<Product>) => {
    updateMutation.mutate({
      id: params.id as string,
      data: product,
    });
  };

  const renderProduct = () => {
    if (productQuery.isLoading) {
      return <p>Loading...</p>;
    }

    if (productQuery.data) {
      return <ProductForm formData={productQuery.data} onSubmit={onSubmit} />;
    }
  };

  return (
    <div className="edit-product-page">
      <h1>Update Product</h1>
      {renderProduct()}
    </div>
  );
};

export default EditProduct;
