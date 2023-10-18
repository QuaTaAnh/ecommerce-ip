import { Link } from "react-router-dom";

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any = "Button";
  if (props.href) {
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
