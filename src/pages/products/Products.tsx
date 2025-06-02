import './Products.css';

import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import productsApi from '@/api/products';

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { data, isError, isFetching } = useQuery({
    queryKey: ['products'],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: productsApi.fetchProducts,
  });

  const updateMutation = useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: () => {
      console.log('update success');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const onAddNewItem = async () => {
    navigation('/new-product');
  };

  const onRemoveProduct = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const onToggleProduct = async (id: string, checked: boolean | 'indeterminate') => {
    console.log(id, checked);
    updateMutation.mutate({
      id,
      data: {
        checked: checked === true,
      },
    });
  };

  if (isFetching) {
    return (
      <div className="loading-box">
        <span>Products loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-box">
        <span>Error</span>
      </div>
    );
  }

  return (
    <div className="product-list">
      <section className="panel">
        <Button onClick={onAddNewItem}>New Product</Button>
      </section>
      <ul className="list-items">
        {data?.map((item) => (
          <li key={item.id} className="list-item">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={(checked) => onToggleProduct(item.id, checked)}
            />
            <Label
              htmlFor={item.id}
              className={clsx('product-title', {
                checked: item.checked,
              })}
            >
              {item.title}
            </Label>
            <Label>{item.price}</Label>
            <Button onClick={() => navigation(`/products/${item.id}`)}>Edit</Button>
            <Button onClick={() => onRemoveProduct(item.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
