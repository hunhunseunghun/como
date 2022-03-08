import React, { useState, useEffect, useRef } from 'react';

const MarketDropDown = ({
  marketDropDownSelected,
  setmarketDropDownSelected,
}) => {
  const outsideRef = useRef(null);
  const [isActive, setIsAcitve] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      outsideRef.current && !outsideRef.current.contains(e.target)
        ? setIsAcitve(false)
        : null;
    };
    document.addEventListener('click', handleClickOutside);
  }, [outsideRef]);

  return (
    <div ref={outsideRef} className="dropdown">
      <div className="dropdownBtn" onClick={() => setIsAcitve(!isActive)}>
        <div>{marketDropDownSelected} 마켓</div>

        <img
          src="https://cdn.upbit.com/images/ico_up_down.d050377.png"
          alt=""
        ></img>
      </div>
      {isActive && (
        <div className="dropdownContent marketDropdownContent">
          <div
            className="dropdownItem"
            onClick={() => {
              setmarketDropDownSelected('KRW');
              setIsAcitve(false);
            }}
          >
            <div>KRW 마켓</div>
          </div>
          <div
            className="dropdownItem"
            onClick={(e) => {
              setmarketDropDownSelected('BTC');
              setIsAcitve(false);
            }}
          >
            <div>BTC 마켓</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDropDown;
