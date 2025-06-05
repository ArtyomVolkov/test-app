import './Product.css';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { type Product } from '@/shared/types/product';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { clsx } from 'clsx';
import { Currency } from '@/lib/utils';
import { useNavigate } from 'react-router';

type ProductProps = {
  product: Product;
  onCheckedChange: (id: string, checked: boolean | 'indeterminate') => void;
  onRemoveProduct: (id: string) => void;
};

const ProductComponent: React.FC<ProductProps> = ({ product, onCheckedChange, onRemoveProduct }) => {
  const navigation = useNavigate();

  return (
    <li className="list-item">
      <Checkbox
        id={product.id}
        checked={product.checked}
        onCheckedChange={(checked) => onCheckedChange(product.id, checked)}
      />
      <Label
        htmlFor={product.id}
        className={clsx('product-title', {
          checked: product.checked,
        })}
      >
        {product.title}
      </Label>
      <Label>{Currency.format(product.price)}</Label>
      <Button disabled={product.checked} onClick={() => navigation(`/products/${product.id}`)}>
        Edit
      </Button>
      <Button disabled={product.checked} onClick={() => onRemoveProduct(product.id)}>
        Remove
      </Button>
    </li>
  );
};

export default ProductComponent;
