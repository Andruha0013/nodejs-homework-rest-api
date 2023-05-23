const EMAIL_REGEXP = /(^[\w\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
const PHONE_REGEXP = /^\+|\d[\s\d\-\(\)]*\d$/;

module.exports = { EMAIL_REGEXP, PHONE_REGEXP };
