import { useEffect, useState } from 'react';

import { Button, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Number } from '~/components/inputs/Number';
import { IProduct, useCreateProduct, useGetProducts } from '~/hooks/useProduct';
import { validatePartNumber } from '~/utils';

const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
  textAlign: 'center',
});

export const CreateProduct = () => {
  const [product, setProduct] = useState<IProduct>({
    name: '',
    size: 0,
    partNumber: '',
    color: '',
  });

  const { data, refetch } = useGetProducts();
  const { createProductMutation } = useCreateProduct();

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, [field]: event.target.value });
    };

  const handleCreateProduct = () => {
    createProductMutation.mutate({ product });
  };

  useEffect(() => {
    if (createProductMutation.isSuccess) {
      refetch();

      createProductMutation.reset();
    }
  }, [createProductMutation.isSuccess, refetch, createProductMutation]);

  return (
    <>
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        <TextField
          label="Name"
          fullWidth
          value={product.name}
          onChange={handleInputChange('name')}
          margin="normal"
        />
        <Number
          label="Size"
          value={product.size}
          handleChange={handleInputChange('size')}
          margin="normal"
          max={1000}
          min={0}
          unit="mm"
        />
        <TextField
          label="Part Number"
          fullWidth
          value={product.partNumber}
          onChange={handleInputChange('partNumber')}
          margin="normal"
        />
        <TextField
          label="Color"
          fullWidth
          value={product.color}
          onChange={handleInputChange('color')}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={data ? validatePartNumber(product.partNumber, data) : true}
          onClick={handleCreateProduct}
        >
          Add
        </Button>
      </StyledPaper>
    </>
  );
};
