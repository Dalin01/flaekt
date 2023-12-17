import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { Box, Container, styled } from '@mui/system';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { useGetProducts } from '~/hooks/useProduct';

const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: '20px',
});

interface IProductListProps {
  onHandleEdit: (partNumber: string, state: boolean) => void;
}

export const ProductList = ({
  onHandleEdit: handleEdit,
}: IProductListProps) => {
  const { status, data, isFetching } = useGetProducts();

  if (status === 'loading' || isFetching) {
    return (
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Grid>
    );
  }

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        Product List ({data?.length} products)
      </Typography>
      {data
        ?.sort((a, b) => a.id - b.id)
        .map((product, index) => (
          <Container key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle1">{product.name}</Typography>
              <IconButton
                id={product.partNumber}
                aria-label="delete"
                size="small"
                onClick={() => handleEdit(product.partNumber, true)}
              >
                <ModeEditIcon />
              </IconButton>
            </Box>
            <Typography variant="body2">Size: {product.size}</Typography>
            <Typography variant="body2">
              Part Number: {product.partNumber}
            </Typography>
            <Typography variant="body2">Color: {product.color}</Typography>
            <hr />
          </Container>
        ))}
    </StyledPaper>
  );
};
