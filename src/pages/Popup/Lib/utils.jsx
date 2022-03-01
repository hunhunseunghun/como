const coinDataUtils = {
  marketNames: (names) => {
    const data = {};
    names.forEach((name) => {
      if (name.market.split('-')[0] !== 'KRW') return;
      data[name.market] = {
        korean: name.korean_name,
        english: name.english_name,
      };
    });

    return data;
  },
};
