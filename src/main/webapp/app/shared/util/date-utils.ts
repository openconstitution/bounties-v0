import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);

export const displayDefaultDateTime = () => moment().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);

export const calculateTimeLeft = (endDate: string) => {
	const date = new Date(endDate).getTime()
	const difference = +new Date(endDate) - +new Date();
	let timeLeft = {};

	const then = moment(endDate)
	const now = moment()

	const countdown = then.diff(now)

	const days = moment(countdown).format('DDDD');
	const hours = moment(countdown).format('HH');
	const minutes = moment(countdown).format('mm');
	const seconds = moment(countdown).format('ss');

	if (countdown >= 0) {
		timeLeft = {
			days,
			hours,
			minutes,
			seconds
		}
	}

	return timeLeft;
};
