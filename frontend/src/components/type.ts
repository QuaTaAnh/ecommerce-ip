import { ProductProps } from "../pages/Admin/type";

export interface ButtonProps {
  to?: string;
  children: React.ReactNode;
  href?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  activeClassName?: string;
  exact?: boolean;
}

export interface LoginProps {
  isOpenLogin: boolean;
  setIsOpenLogin: (open: boolean) => void;
  isOpenRegister: boolean;
  setIsOpenRegister: (open: boolean) => void;
}

export interface RegisterProps {
  setIsOpenRegister: (open: boolean) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface LoginDataProp {
  email: string;
  password: string;
}

export interface RegisterDataProp {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface BreadcrumbProps {
  label?: string;
  path?: string;
}

export interface CardProps {
  children: React.ReactNode;
  create?: boolean;
}

export interface TableColumn {
  value: string;
  label: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface CustomTableProps {
  columns: TableColumn[];
  data: TableRow[] | any;
  actions?: boolean;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  onCopy: (row: any) => void;
  itemsPerPage: number;
  page: number;
  setPage: (page: number) => void;
  totalPage: number;
}

export interface ProductProp {
  product: ProductProps;
}
