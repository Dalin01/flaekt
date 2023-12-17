import { useEffect, useState } from 'react';

import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

import { IIsEdit } from '~/components/body';
import { Number } from '~/components/inputs/Number';
import { IProduct, useEditProduct, useGetProducts } from '~/hooks/useProduct';
import { validatePartNumber } from '~/utils';

const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
  textAlign: 'center',
});

interface IEditProductProps {
  onHandleEdit: (partNumber: string, state: boolean) => void;
  isEdit: IIsEdit;
}
export const EditProduct = ({
  onHandleEdit: handleEdit,
  isEdit,
}: IEditProductProps) => {
  const { data, refetch } = useGetProducts();
  const { editProductMutation } = useEditProduct();
  const productToEdit = data?.find(
    (product) => product.partNumber === isEdit.partNumber,
  );

  const [product, setProduct] = useState<IProduct>({
    name: '',
    size: 0,
    partNumber: '',
    color: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  useEffect(() => {
    if (editProductMutation.isSuccess) {
      refetch();

      editProductMutation.reset();
    }
  }, [editProductMutation.isSuccess, refetch, editProductMutation]);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setProduct({ ...product, [field]: event.target.value });
    };

  const handleEditProduct = () => {
    editProductMutation.mutate({ product, partNumber: isEdit.partNumber });
  };

  return (
    <>
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Edit Product
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
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => handleEdit('', false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              data ? validatePartNumber(product.partNumber, data, true) : true
            }
            onClick={handleEditProduct}
          >
            Save
          </Button>
        </Box>
      </StyledPaper>
    </>
  );
};
