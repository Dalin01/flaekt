import { useState } from 'react';

import { Grid } from '@mui/material';

import { CreateProduct } from '~/components/createProduct';
import { ProductList } from '~/components/productList';
import { EditProduct } from '~/components/editProduct';

export interface IIsEdit {
  state: boolean;
  partNumber: string;
}

export const Body = () => {
  const [isEdit, setIsEdit] = useState<IIsEdit>({
    state: false,
    partNumber: '',
  });

  const handleEdit = (partNumber: string, state: boolean) => {
    setIsEdit({ ...setIsEdit, state, partNumber });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {!isEdit.state ? (
          <CreateProduct />
        ) : (
          <EditProduct onHandleEdit={handleEdit} isEdit={isEdit} />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductList onHandleEdit={handleEdit} />
      </Grid>
    </Grid>
  );
};
