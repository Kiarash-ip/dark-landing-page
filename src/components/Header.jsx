import React, { useRef, useEffect, useState } from "react";
import "./Header.scss";
import { useScroll, animated, useSpring } from "@react-spring/web";

export default function Header() {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollTopPrev, setScrollTopPrev] = useState(0);
  const [right, setRight] = useState(0);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      setScrollTop(scrollYProgress);
      // if (scrollYProgress > 0.7) {
      //   console.log("more than 0.7");
      //   // textApi.start({ y: "0" });
      // } else {
      //   console.log("less than 0.7");

      //   // textApi.start({ y: "100%" });
      // }
    },
  });

  useEffect(() => {
    console.log(scrollYProgress);
  });

  return (
    <div ref={containerRef} className="header">
      <div className="animated__layers">
        <img
          src="/public/images/BG Hero.png"
          className="header__top--gradient"
        />
        <img src="/public/images/HG.png" className="header__sky__img" />
        <img src="/public/images/MG.png" className="header__mountains__img" />
        <animated.div
          style={{
            right: scrollTop * 1000,
            position: "absolute",
            top: "50%",
          }}
        >
          <img src="/public/images/VG.png" className="header__person__img" />
        </animated.div>
        <img
          src="/public/images/BG Content.png"
          className="header__bottom--gradient"
        />
      </div>
      {new Array(5).fill(null).map((_, index) => (
        <div className="full__page" key={index} />
      ))}
    </div>
  );
}
