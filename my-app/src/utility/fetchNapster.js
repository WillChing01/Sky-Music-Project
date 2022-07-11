const header = {headers: {apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3'}};

export const fetchQuery = async (query) => {
    const res = await fetch(`https://api.napster.com/v2.2/search/verbose?query=${query}`, header);
    const jRes = await res.json();
    const newData = jRes.search.data;
    return newData;
};

const fetchChannelTop = async (channel) => {
  const fetchUrl = `https://api.napster.com/v2.2/${channel}/top`;
  const res = await fetch(fetchUrl, header);
  const jRes = await res.json();
  return jRes;
};

export const fetchTop = async (data, channelsOpen) => {
  const newData = {...data};
  for (const [channel, isOpen] of Object.entries(channelsOpen)) {
    if (isOpen) {
      const channelData = await fetchChannelTop(channel);
      newData[channel] = channelData[channel];
    }
  }
  return newData;
};
