export const timeSince = (date: number, dateFormated: string) => {
  const seconds = Math.floor(date / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) - 1 ? 'years' : 'year'
    }`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return dateFormated;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) - 1 ? 'days' : 'day'
    }`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) - 1 ? 'hours' : 'hour'
    }`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} min`;
  }
  return `${Math.floor(seconds)} sec`;
};
