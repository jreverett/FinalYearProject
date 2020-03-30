import moment from 'moment';

export function formatDateTime(dateTimeISO8601) {
  // convert ISO8601 datetime to a readable string, such as: "5:00 pm, Fri 4th Jun, 2020"
  return moment(dateTimeISO8601).format('h:mm a, ddd Do MMM, YYYY');
}
