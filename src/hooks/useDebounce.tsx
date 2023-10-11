import { useEffect, useState } from "react";

const useDebounce = <T extends unknown>(input: T, delay: number): T => {
	const [value, setValue] = useState<T>(input);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setValue(input);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [input]);

	return value;
};

export default useDebounce;
