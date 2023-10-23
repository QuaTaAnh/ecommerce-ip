export interface ButtonProps {
  to?: string;
  children: React.ReactNode;
  href?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
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
