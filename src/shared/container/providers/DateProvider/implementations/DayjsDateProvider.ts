import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow() {
    return dayjs().toDate();
  }

  convertToUTC(date: Date) {
    return dayjs(date).utc().local().format();
  }

  compareInHours(startDate: Date, endDate: Date) {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  compareInDays(startDate: Date, endDate: Date) {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  addDays(days: number) {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number) {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareIfBefore(startDate: Date, endDate: Date) {
    return dayjs(startDate).isBefore(endDate);
  }
}

export { DayjsDateProvider };
