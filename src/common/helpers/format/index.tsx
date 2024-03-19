import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const Format = {
  date: 'YYYY-MM-DD',
  dateJp: 'YYYY/MM/DD',
  month: 'YYYY-MM',
  monthJp: 'YYYY/MM',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeJp: 'YYYY/MM/DD HH:mm:ss',
  dateTimeJpNoSeconds: 'YYYY/MM/DD HH:mm',
  dateTimeFilename: 'YYYYMMDD_HHmm',
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export const FormatterTimezone = {
  date: (date?: string | Date | Dayjs | null): string =>
    !date ? '' : String(dayjs.utc(date).tz().format(Format.date)),
  dateTime: (date?: string | Date | Dayjs | null): string =>
    !date ? '' : String(dayjs.utc(date).tz().format(Format.dateTime)),
  dateJp: (date?: string | Date | Dayjs | null): string =>
    !date ? '' : String(dayjs.utc(date).tz().format(Format.dateJp)),
  dateTimeJp: (date?: string | Date | Dayjs | null): string =>
    !date ? '' : String(dayjs.utc(date).tz().format(Format.dateTimeJp)),
  dateTimeJpNoSeconds: (date?: string | Date | Dayjs | null): string =>
    !date ? '' : String(dayjs.utc(date).tz().format(Format.dateTimeJpNoSeconds)),
}
