import React, { useState, useEffect, useRef } from 'react';
import upbitLogo from '../../../../assets/img/upbitLogo.png';
import bithumblogo from '../../../../assets/img/bithumblogo.png';
import coinonelogo from '../../../../assets/img/coinonelogo.png';
export const ExchangerDropdown = ({
  dropDownSelected,
  setDropDownSelected,
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
  }, [outsideRef]);

  const handleExchangerLogo = () => {
    switch (dropDownSelected) {
      case '업비트':
        return upbitLogo;
      case '빗썸':
        return bithumblogo;
      case '코인원':
        return coinonelogo;
    }
  };
  return (
    <div ref={outsideRef} className="dropdown">
      <div className="dropdownBtn" onClick={() => setIsActive(!isActive)}>
        <div>
          <img className="exchangerLogo" src={handleExchangerLogo()}></img>
          {dropDownSelected}
        </div>

        <img
          src="https://cdn.upbit.com/images/ico_up_down.d050377.png"
          alt=""
        ></img>
      </div>
      {isActive && (
        <div className="dropdownContent exchangerDropdownContent">
          <div
            className="dropdownItem"
            onClick={(e) => {
              setDropDownSelected(e.target.textContent);
              setIsActive(false);
            }}
          >
            <img src={upbitLogo} alt="" />
            <div>업비트</div>
          </div>
          <div
            className="dropdownItem"
            onClick={(e) => {
              setDropDownSelected(e.target.textContent);
              setIsActive(false);
            }}
          >
            <img src={bithumblogo} alt="" />
            <div>빗썸</div>
          </div>
          {/* <div
            className="dropdownItem"
            onClick={(e) => {
              setDropDownSelected(e.target.textContent);
              setIsAcitve(false);
            }}
          >
            <img src={coinonelogo} alt="" />
            <div>코인원</div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ExchangerDropdown;
