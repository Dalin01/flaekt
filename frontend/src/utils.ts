import { IProduct } from '~/hooks/useProduct';

export const validatePartNumber = (
  value: string,
  products: IProduct[],
  isEditing?: boolean,
): boolean => {
  const hasValidLength = value.length >= 6 && value.length <= 10;
  const isAlphanumeric = /^[a-z0-9]+$/i.test(value);
  const isUnique = products.filter((product) => product.partNumber === value);

  if (isEditing && (!hasValidLength || !isAlphanumeric)) {
    return true;
  }

  if (
    !isEditing &&
    (!hasValidLength || !isAlphanumeric || isUnique.length > 0)
  ) {
    return true;
  }

  return false;
};
