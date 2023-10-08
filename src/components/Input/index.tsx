import { ChangeEvent, FC } from "react";
import "./input.scss";

const Input: FC<{
	small?: boolean;
	fullWidth?: boolean;
	value?: string | number;
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ small = false, fullWidth = false, value = "", placeholder = "", onChange = () => {} }) => {
	const classess = [small ? "small" : undefined, fullWidth ? "full-width" : undefined].filter((x) => x);

	return <input className={classess.join(" ")} type="text" value={value} onChange={onChange} placeholder={placeholder} />;
};

export default Input;
