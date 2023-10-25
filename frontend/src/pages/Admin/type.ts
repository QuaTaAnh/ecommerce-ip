export interface CategoryProps {
  _id?: string;
  name?: string;
  slug?: string;
}

export interface CreateUpdateCategoryProps {
  isOpenAddCategory: boolean;
  setIsOpenAddCategory: (open: boolean) => void;
  isEdit: boolean;
  setIsEdit: (open: boolean) => void;
  getAllCategory: () => void;
  initValue: CategoryProps | undefined;
}
