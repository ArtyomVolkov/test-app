import './NewProduct.css';

import { useState, type ChangeEvent, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import productsApi from '@/api/products';

const NewProduct = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
  });

  const addMutation = useMutation({
    mutationFn: productsApi.addProduct,
  });

  const onChangeFormField = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await addMutation.mutate({
      id: Date.now().toString(),
      title: formData.title,
      price: formData.price,
    });
    navigation('/products');
  };

  return (
    <div className="new-product-page">
      <h1>New Product</h1>
      <form className="new-product-form">
        <div className="form-group">
          <Label htmlFor="title">Product Name</Label>
          <Input id="title" name="title" required onChange={onChangeFormField} />
        </div>
        <div className="form-group">
          <Label htmlFor="product-price">Price</Label>
          <Input type="number" id="price" name="price" onChange={onChangeFormField} />
        </div>
        <Button type="submit" onClick={onSubmit}>
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default NewProduct;
