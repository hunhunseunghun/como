import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInit, startBithumb } from './Reducer/coinReducer.jsx';
import './Popup.css';

import encoding from 'text-encoding';

import CoinList from './Components/Upbit/CoinList.jsx';
import ExchangerDropdown from './Components/Dropdown/ExchangerDropdown';
import MarketDropDown from './Components/Dropdown/marketDropDown';
import BithumbCoinList from './Components/Bithumb/BithumbCoinList.jsx';

import { FaSistrix } from 'react-icons/fa';
import {
  CgArrowDownR,
  CgArrowUpR,
  CgArrowLeftR,
  CgArrowRightR,
} from 'react-icons/cg';
import defaultcomologo from '../../assets/img/defaultcomologo.png';

const Popup = () => {
  const dispatch = useDispatch();
  const searchInputRef = useRef();
  const [makeSort, setMakeSort] = useState('decending');
  const [sortElement, setSortElement] = useState('trade_price');
  const [dropDownSelected, setDropDownSelected] = useState('업비트');
  const [marketDropDownSelected, setmarketDropDownSelected] = useState('KRW');
  const [searchCoinName, setSearchCoinName] = useState('');
  const [windowXaxisSize, setWindowXaxisSize] = useState(false);
  const [windowYaxisSize, setWindowYaxisSize] = useState(false);

  useEffect(() => {
    dispatch(startInit());
    dispatch(startBithumb());
  }, [dispatch]);

  const windowResize = () => {
    // document.body.clientHeight(500);
    switch (windowXaxisSize) {
      case true:
        return;
    }
  };

  const handleSortPrice = () => {
    setSortElement('trade_price');

    makeSort === 'ascending'
      ? setMakeSort('decending')
      : setMakeSort('ascending');
  };

  const handleSortRate = () => {
    setSortElement('change_rate');

    makeSort === 'ascending'
      ? setMakeSort('decending')
      : setMakeSort('ascending');
  };

  const handleSortTotal = () => {
    setSortElement('acc_trade_price_24h');

    makeSort === 'ascending'
      ? setMakeSort('decending')
      : setMakeSort('ascending');
  };

  return (
    <div className="App">
      <nav>
        <div className="custom-shape-divider-top-1646706813">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <section className="nav_top_section">
          <img src={defaultcomologo}></img>

          <section>
            <div
              className="windowYaxisSize_btn"
              onClick={() => {
                setWindowYaxisSize(!windowYaxisSize);
                windowResize();
              }}
              data-tip
              data-="windowXaxisSize_btn_tooltip"
              title={`창 가로 ${windowYaxisSize ? '축소' : '확대'}`}
            >
              {windowYaxisSize ? (
                <CgArrowLeftR size="20" />
              ) : (
                <CgArrowRightR size="20" />
              )}
            </div>
            <div
              className="windowXaxisSize_btn"
              onClick={() => {
                setWindowXaxisSize(!windowXaxisSize);
                windowResize();
              }}
              data-tip
              data-for="windowXaxisSize_btn_tooltip"
              title={`창 세로 ${windowXaxisSize ? '축소' : '확대'}`}
            >
              {windowXaxisSize ? (
                <CgArrowUpR size="20" />
              ) : (
                <CgArrowDownR size="20" />
              )}
            </div>
          </section>
        </section>

        <section className="nav_bottom_section">
          <div
            className="coinSearchBar"
            onClick={() => {
              searchInputRef.current.focus();
            }}
          >
            <FaSistrix />
            <input
              ref={searchInputRef}
              className="coinSearchInput coinSearchText"
              type="text"
              placeholder=""
              onChange={(e) => {
                console.log(e.target.value);
                setSearchCoinName(e.target.value);
              }}
            />
            검색
          </div>

          <div>
            <MarketDropDown
              marketDropDownSelected={marketDropDownSelected}
              setmarketDropDownSelected={setmarketDropDownSelected}
            />
            <ExchangerDropdown
              dropDownSelected={dropDownSelected}
              setDropDownSelected={setDropDownSelected}
            />
          </div>
        </section>
      </nav>
      <table
        className={`${windowXaxisSize ? 'table_X_wide' : ''} ${
          windowYaxisSize ? 'table_Y_wide' : ''
        }`}
      >
        <thead>
          <tr>
            <th>
              <div>코인</div>
            </th>
            <th onClick={handleSortPrice}>
              <div>현재가</div>
              <img
                src="https://cdn.upbit.com/images/ico_up_down.d050377.png"
                alt=""
              ></img>
            </th>
            <th onClick={handleSortRate}>
              <div>전일대비</div>
              <img
                src="https://cdn.upbit.com/images/ico_up_down.d050377.png"
                alt=""
              ></img>
            </th>
            <th onClick={handleSortTotal}>
              <div>거래대금</div>
              <img
                src="https://cdn.upbit.com/images/ico_up_down.d050377.png"
                alt=""
              ></img>
            </th>
          </tr>
        </thead>
        {dropDownSelected === '업비트' && (
          <CoinList
            marketDropDownSelected={marketDropDownSelected}
            makeSort={makeSort}
            sortElement={sortElement}
            searchCoinName={searchCoinName}
          />
        )}
        {dropDownSelected === '빗썸' && (
          <BithumbCoinList
            marketDropDownSelected={marketDropDownSelected}
            makeSort={makeSort}
            sortElement={sortElement}
            searchCoinName={searchCoinName}
          />
        )}
      </table>
      <footer>
        <div>como</div>
      </footer>
    </div>
  );
};

export default Popup;
