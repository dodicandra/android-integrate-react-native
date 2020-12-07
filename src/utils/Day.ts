import dayjs from 'dayjs';

export function isSame(value: string | number | Date) {
  const curenDate = getDate(value);
  const newDate = getDate(new Date());

  const curent = new Date(curenDate);
  const newd = new Date(newDate);

  if (curent > newd) {
    return false;
  } else {
    return true;
  }
}

export const getDate = (value?: any) => {
  // let q = new Date();
  // let m = q.getMonth() + 1;
  // let d = q.getDay();
  // let y = q.getFullYear();
  // const date = new Date(y, m, d);

  const km = new Date(value);

  const utcDay = km.getDate();
  const utcMoth = km.getMonth() + 1;
  const utcYear = km.getFullYear().toString().substr(0, 2);
  const utcHour = km.getHours();
  const utcSec = km.getMinutes();
  const utcMili = km.getSeconds();

  const newCurentDate = `${utcDay}/${utcMoth}/${utcYear}`;
  return newCurentDate;
};

export const getTime = (value: string) => {
  const date = new Date(value);

  const h = date.getHours();
  const s = date.getMinutes();

  return `${h}:${s}`;
};

type Message = {createdAt: string};

export function isSameDay(currentMessage: Message, diffMessage: Message) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}
