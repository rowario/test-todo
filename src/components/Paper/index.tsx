import { FC, ReactNode } from "react";
import "./module.scss";

const Paper: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className="paper">{children}</div>;
};

export default Paper;
