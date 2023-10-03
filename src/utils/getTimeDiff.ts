const getTimeDiff = (start: Date, end: Date) => {
  const milliseconds = start.getTime() - end.getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${!hours ? minutes + 'm' : ''} ${hours ? hours + 'h' : ''} ${
    days ? days + 'd' : ''
  }`;
};

export { getTimeDiff };
