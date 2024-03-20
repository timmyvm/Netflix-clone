import React, { useEffect, useState } from "react";
import NavCSS from "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  const TransitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", TransitionNavBar);
    return () => window.removeEventListener('scroll', TransitionNavBar)
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        />
        <img
          className="nav__avatar"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg
          AAAMwAAADACAMAAAB/Pny7AAAAb1BMVEUNfoD///8Ae30Adnj7/f
          0AcHLt9PSiw8P2+vpTnZ7y+Pjl8PCBsrMAdHdMl5kxioy+29upzc
          7U5OS91tdaoqN3qKmIr7CJubqSvb6x0dIxhIZEjI48h4hhoKGaxM
          XO5OR6tbZvrrA9k5Uah4nK2tuXb2ZTAAAD90lEQVR4nO3bYXeqIB
          wGcAVyJqaJOTGHpvb9P+PVWlsmnVZ4cTvn+b2698X47xkIKug4AA
          AAAAAAAAAAAAAAAAAAAAAAALMiJwuVduYs3Te1L6Oo3DvW8/QFP8
          r1jKVJrKraZ8ytKxVbjUOcOEu4y1hQS9XNUZmqred+YmlmMQ1xDt
          tLZZcnETVvMePuFR46ttKQuPKuS4udaZpNOGrQdb3cUt+QfeWPS/
          O1WRqiuHuDZ5bChP5taVGalCZdetug625jK2kiMS2dmIwK2kw6pp
          8FQith5LSyy00mAVpoWnQTG3PAvtZUZm+blxsk8VbTosuNhu4PS
          3/oKrvp639HOr38T9YWwuy0lUX7epgs0Da5sxDmoA8TIczgFw6z
          18OQWDeluIGNCaDUhtka3G4SzZrZt7i3MTVrB0Vhss7c3pmd2Fk
          0K01lrgzCaMeZwbh9pnSk6ZrUqEnaTLrGt9MxuvnM9LZ5k9/Mzq
          yy9giQsHHpQL1+M3NukuSjvvEqO/fMQ+m4GD0EeKFhlr7JzU58d
          Q4TIbX52CzFV+d42/VqhjZpm6fCY77PU9nafaFBoreU+z7zRBrG5
          q8ATm1SJ8re399VZ7FbLqU71VfOIme+0oTQwRJvAZerDAAAAAAA
          AAAAAPAyQpc6WDk7Qh2VZdEyceat2reWFdzzRD7L4cYni9Ouo/N
          sQQz6XknPO5yBnK3RHxdvi1qkajNLnP5aUenX7p3RfvMraHPaamN
          Fa77XRVZOU1/vBkrb4+yyd+fldGN08fRRwpsd9MpumFVyVTuPXp0
          L+ol4r6aH96qZf9sH6OhwpZeo54+LD0fm96oSbJLFz+xeM/TmpCi
          rpSqf2JPsr3inVPl2cnh2aCuxtnN/Nhpmn3PQUWYtofRRD532Tj
          sVJrX+bFhgO4tDWs3flHl1kqto79xLNORwulKFw2a5NonrFZn9NZ
          NK3VmofrxzkVZStR1drVb0YkOH/5IuyvIqFVx/9nD46bTpNkvczS
          jtqduhg3yfcyGORXU4NOvBrjmEb4kQgnuBP73gvweYiq19hTBCSH
          zQnBcfhQqCwDvp/8HuhzjjibL/7c51HO25u5fwsF2mU77jbEhzb7A
          9I0h3q0UulUmcXRHcmZl+hAVCtjPefZuhq07W92baB3xey/g3dMq3
          4VhSdXw6TyCOcoFDVA+R4YFEFj/uoGE1SsL28e3CQvrFvWszmaTi7p
          L4iR8LmamY/NYkZ6c3K3GUhbLY8v5p/mptYaxfcXgfowqzqOxm/cT0
          /yHDiHPijzJSTZiHb2cyzA9KReXH/g++Tbp8Wfz1W5PPL37/VgwAAA
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPi9/gH7gDBYPxaZ2QAAAABJ
          RU5ErkJggg=="
        />
      </div>
    </div>
  );
};

export default Nav;
