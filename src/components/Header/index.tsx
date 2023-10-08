import { FC, ReactNode } from "react";
import "./module.scss";

import Container from "../Container";

const Header: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="header_wrapper">
			<Container>
				<header className="header">{children}</header>
			</Container>
		</div>
	);
};

export default Header;
