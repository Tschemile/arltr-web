export const timeSince = (date: number, dateFormated: string) => {
  const seconds = Math.floor(date / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) - 1 ? 'years ago' : 'year ago'
    }`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return dateFormated;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) - 1 ? 'days ago' : 'day ago'
    }`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) - 1 ? 'hours ago' : 'hour ago'
    }`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} min ago`;
  }
  if (seconds > 0) {
    return `${Math.floor(seconds)} sec ago`;
  }
  return 'Just now';
};

export const getFirstLetter = (keyword: string) => {
  return keyword.toUpperCase().slice(0, 1);
};
