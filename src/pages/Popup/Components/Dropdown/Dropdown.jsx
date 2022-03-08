import React, { useState, useEffect, useRef } from 'react';

export const DropDown = ({ dropDownSelected, setDropDownSelected }) => {
  const [isActive, setIsAcitve] = useState(false);
  const logoUrl = {
    upbit: 'https://gi.esmplus.com/kingdooo/upbitlogo.png',
    bithumb: 'https://gi.esmplus.com/kingdooo/bithumblogo.png',
    coinone: 'https://gi.esmplus.com/kingdooo/coinonelogo.png',
  };
  const outsideRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      outsideRef.current && !outsideRef.current.contains(e.target)
        ? setIsAcitve(false)
        : null;
    };
    document.addEventListener('click', handleClickOutside);
  }, [outsideRef]);

  const handleExchangerLogo = () => {
    switch (dropDownSelected) {
      case '업비트':
        return logoUrl.upbit;
      case '빗썸':
        return logoUrl.bithumb;
      case '코인원':
        return logoUrl.coinone;
    }
  };
  return (
    <div ref={outsideRef} className="dropdown">
      <div className="dropdownBtn" onClick={() => setIsAcitve(!isActive)}>
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
        <div className="dropdownContent">
          <div
            className="dropdownItem"
            onClick={(e) => {
              setDropDownSelected(e.target.textContent);
              setIsAcitve(false);
            }}
          >
            <img src="https://gi.esmplus.com/kingdooo/upbitlogo.png" alt="" />
            <div>업비트</div>
          </div>
          <div
            className="dropdownItem"
            onClick={(e) => {
              setDropDownSelected(e.target.textContent);
              setIsAcitve(false);
            }}
          >
            <img src="https://gi.esmplus.com/kingdooo/bithumblogo.png" alt="" />
            <div>빗썸</div>
          </div>
          <div
            className="dropdownItem"
            onClick={(e) => {
              setDropDownSelected(e.target.textContent);
              setIsAcitve(false);
            }}
          >
            <img src="https://gi.esmplus.com/kingdooo/coinonelogo.png" alt="" />
            <div>코인원</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
