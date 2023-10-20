export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface LoginProps {
  isModalLoginOpen: boolean;
  closeModal: () => void;
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
