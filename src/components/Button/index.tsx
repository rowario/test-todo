import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./module.scss";

type ButtonProps<C extends ElementType> = {
	as?: C;
	children: ReactNode;
	fullWidth?: boolean;
} & ComponentPropsWithoutRef<C>;

const Button = <C extends ElementType>({ as, children, fullWidth = false, ...rest }: ButtonProps<C>) => {
	const Component = as || "button";

	return (
		<Component {...rest} className={["button", fullWidth ? "full-width" : ""].join(" ").trim()}>
			{children}
		</Component>
	);
};

export default Button;
