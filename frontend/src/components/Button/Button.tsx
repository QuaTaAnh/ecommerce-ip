import { Link } from "react-router-dom";
import { ButtonProps } from "../type";

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  let Component: any = "button";
  if (props.to) {
    Component = Link;
  }

  return (
    <Component {...props} className={props.className}>
      {props.leftIcon && <span className="pr-2">{props.leftIcon}</span>}
      {props.children}
    </Component>
  );
};

export default Button;
