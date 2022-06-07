import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as Hangul from 'hangul-js';
const CoinoneList = () => {
  useEffect(() => {
    console.log('coinone coninlist excuted');
  }, []);
  return <div>CoinoneList</div>;
};

export default CoinoneList;
