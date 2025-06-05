import './Products.css';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import productsApi from '@/api/products';
import ProductComponent from '@/shared/components/product/Product';

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.fetchProducts,
  });

  const updateMutation = useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Delete product success');
    },
  });

  const onAddNewItem = async () => {
    navigation('/new-product');
  };

  const onRemoveProduct = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const onToggleProduct = async (id: string, checked: boolean | 'indeterminate') => {
    updateMutation.mutate({
      id,
      data: {
        checked: checked === true,
      },
    });
  };

  if (!data && isFetching) {
    return (
      <div className="loading-box">
        <span>Products loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="product-list-page">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <section className="panel">
        <Button onClick={onAddNewItem}>New Product</Button>
      </section>
      <ul className="list-items">
        {!data?.length && (
          <Alert>
            <AlertTitle>No Products</AlertTitle>
          </Alert>
        )}
        {data?.map((item) => (
          <ProductComponent
            key={item.id}
            product={item}
            onCheckedChange={onToggleProduct}
            onRemoveProduct={onRemoveProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
