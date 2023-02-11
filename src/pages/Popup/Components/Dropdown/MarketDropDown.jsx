import React, { useState, useEffect, useRef } from 'react';

const MarketDropDown = ({
  marketDropDownSelected,
  setmarketDropDownSelected,
}) => {
  const outsideRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      return outsideRef.current && !outsideRef.current.contains(e.target)
        ? setIsActive(false)
        : null;
    };
    document.addEventListener('click', handleClickOutside);
    console.log("isActive")
  }, [outsideRef]);

  return (
    <div ref={outsideRef} className="dropdown">
      <div className="dropdownBtn" onClick={() => setIsActive(!isActive)}>
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
              setIsActive(false);
            }}
          >
            <div>KRW 마켓</div>
          </div>
          <div
            className="dropdownItem"
            onClick={(e) => {
              setmarketDropDownSelected('BTC');
              setIsActive(false);
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
