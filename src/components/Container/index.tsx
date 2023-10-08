import { FC, ReactNode } from "react";
import "./module.scss";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className="container">{children}</div>;
};

export default Container;
