import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const format = "HH:mm:ss";

const Timer: FC<{ startedAt: Date }> = ({ startedAt }) => {
	const [time, setTime] = useState(dayjs.duration(dayjs().diff(startedAt)).format(format));

	useEffect(() => {
		const interval = setInterval(() => {
			const timePassed = dayjs.duration(dayjs().diff(startedAt));

			setTime(timePassed.format(format));
		}, 1000);

		return () => clearInterval(interval);
	}, [startedAt]);

	return <>{time}</>;
};

export default Timer;
