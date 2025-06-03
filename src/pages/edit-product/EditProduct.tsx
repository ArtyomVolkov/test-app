import './EditProduct.css';
import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import productsApi from '@/api/products';

const EditProduct = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
  });

  const productQuery = useQuery({
    queryKey: ['products', params.id],
    queryFn: async () => {
      return await productsApi.fetchProduct(params.id as string);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; data: Partial<typeof formData> }) => {
      return await productsApi.updateProduct(data);
    },
    onSuccess: async () => {
      navigation('/products');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product update success');
    },
  });

  useEffect(() => {
    if (productQuery.data) {
      setFormData({
        title: productQuery.data.title,
        price: productQuery.data.price,
      });
    }
  }, [productQuery.data]);

  const onChangeFormField = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    updateMutation.mutate({
      id: params.id as string,
      data: {
        title: formData.title,
        price: formData.price,
      },
    });
  };

  return (
    <div className="edit-product-page">
      <h1>Update Product</h1>
      <form className="new-product-form">
        <div className="form-group">
          <Label htmlFor="title">Product Name</Label>
          <Input id="title" name="title" value={formData.title} onChange={onChangeFormField} />
        </div>
        <div className="form-group">
          <Label htmlFor="product-price">Price</Label>
          <Input type="number" id="price" name="price" value={formData.price} onChange={onChangeFormField} />
        </div>
        <Button type="submit" onClick={onSubmit}>
          Update product
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
