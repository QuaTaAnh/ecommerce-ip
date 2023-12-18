export interface CategoryProps {
  _id?: string;
  name?: string;
  slug?: string;
  type?: string;
  image?: string;
}

export interface ProductProps {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  category?: CategoryProps[];
  price?: number;
  quantity?: number;
  image?: string;
  shipping?: boolean;
  quantityCart?: number;
  totalPrice?: number;
}

export interface CreateUpdateCategoryProps {
  isOpenAddCategory: boolean;
  setIsOpenAddCategory: (open: boolean) => void;
  isEdit: boolean;
  setIsEdit: (open: boolean) => void;
  isCopy: boolean;
  setIsCopy: (open: boolean) => void;
  getAllCategory: () => void;
  initValue: CategoryProps | undefined;
}

export interface DeleteCategoryProps {
  isOpenDeleteCategory: boolean;
  setIsOpenDeleteCategory: (open: boolean) => void;
  getAllCategory: () => void;
  initValue: CategoryProps | undefined;
}

export interface CreateUpdateProductProps {
  isOpenAddProduct: boolean;
  setIsOpenAddProduct: (open: boolean) => void;
  isCopy: boolean;
  setIsCopy: (open: boolean) => void;
  isEdit: boolean;
  setIsEdit: (open: boolean) => void;
  getAllProduct: () => void;
  initValue: ProductProps | undefined;
  allCategory: CategoryProps[];
}

export interface DeleteProductProps {
  isOpenDeleteProduct: boolean;
  setIsOpenDeleteProduct: (open: boolean) => void;
  getAllProduct: () => void;
  initValue: CategoryProps | undefined;
}
export interface OrderProps {
  _id?: string;
  product?: ProductProps[];
  payment?: any;
  buyer?: string;
  status?: string;
  createAt?: string;
}
