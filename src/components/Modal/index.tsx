import { FC, ReactNode } from "react";
import Paper from "../Paper";
import "./modal.scss";

export const Modal: FC<{ children: ReactNode; opened: boolean; onClose: () => any }> = ({ children, opened, onClose }) => {
	const classes = opened ? "modal-wrapper show" : "modal-wrapper hide";

	return (
		<div className={classes} onClick={() => onClose()}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<Paper>{children}</Paper>
			</div>
		</div>
	);
};


				// <div onClick={() => onClose()} className="close-button">
				// 	×
				// </div>
