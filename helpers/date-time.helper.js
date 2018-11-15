const moment = require('moment');

module.exports.FORMAT = {
    DATE_MONTH_YEAR_HH_MM_SS : 'DD/MM/YYYY HH:mm:ss',
}

module.exports.addMinute = (date, minute) => {
    return new Date(date.getTime() + minute * 60 * 1000);
}

module.exports.addMinuteFromNow = (minute) => {
    return this.addMinute(new Date(), minute);
}

module.exports.toString = (d) => {
    const month = (d.getMonth() + 1),
        day = d.getDate(),
        year = d.getFullYear();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${day}/${month}/${year}`;
}

module.exports.getTimeFormatFromTime = (date, format) => {
    return date ? moment(date).format(format) : ''
  }