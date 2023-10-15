import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./button.scss";

type ButtonProps<C extends ElementType> = {
	as?: C;
	children: ReactNode;
	fullWidth?: boolean;
	small?: boolean;
	color?: "teal" | "red";
} & ComponentPropsWithoutRef<C>;

const Button = <C extends ElementType>({
	as,
	children,
	fullWidth = false,
	small = false,
	color = "teal",
	...rest
}: ButtonProps<C>) => {
	const Component = as || "button";
	const classess = ["button", color, small ? "small" : undefined, fullWidth ? "full-width" : undefined].filter((x) => x);

	return (
		<Component {...rest} className={classess.join(" ").trim()}>
			{children}
		</Component>
	);
};

export default Button;
