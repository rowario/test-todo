import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const format = "HH:mm:ss";

const getDifference = (from: Date) => dayjs.duration(dayjs().diff(from)).format(format);

const Timer: FC<{ startedAt: Date }> = ({ startedAt }) => {
	const [time, setTime] = useState(getDifference(startedAt));

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getDifference(startedAt));
		}, 1000);

		return () => clearInterval(interval);
	}, [startedAt]);

	return <>{time}</>;
};

export default Timer;
