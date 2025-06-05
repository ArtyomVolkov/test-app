import './ProductForm.css';
import { useState } from 'react';
import type { Product } from '@/shared/types/product';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ProductFormProps = {
  formData: Partial<Product>;
  onSubmit: (data: Partial<Product>) => Promise<void>;
};
const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, formData }) => {
  const [form, setForm] = useState<Partial<Product>>(formData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  const onChangeFormField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <Label htmlFor="title">Product Name</Label>
        <Input type="text" id="title" name="title" required value={form.title} onChange={onChangeFormField} />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <Input type="number" id="price" name="price" required value={form.price} onChange={onChangeFormField} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProductForm;
