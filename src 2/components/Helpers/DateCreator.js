export const dateCreator = (date = new Date('December 17, 1995 03:24:00')) => {
  console.log('date in dateCreator...', date);
  const rowDate = date;
  const fullYears = rowDate.getFullYear();
  const month =
    rowDate.getMonth() > 9 ? rowDate.getMonth() : `0${rowDate.getMonth()}`;
  const day = rowDate.getDay() > 9 ? rowDate.getDay() : `0${rowDate.getDay()}`;
  const hour = rowDate.getHours();
  const minute =
    rowDate.getMinutes() > 9
      ? rowDate.getMinutes()
      : `0${rowDate.getMinutes()}`;
  const second =
    rowDate.getSeconds() > 9
      ? rowDate.getSeconds()
      : `0${rowDate.getSeconds()}`;
  let result = '';
  result +=
    fullYears +
    '.' +
    month +
    '.' +
    day +
    ' at: ' +
    hour +
    ':' +
    minute +
    ':' +
    second;

  return result;
};
