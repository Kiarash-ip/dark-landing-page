import React, { useRef, useEffect, useState } from "react";
import "./Header.scss";
import { useScroll, animated, useSpring } from "@react-spring/web";

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function getPercentageIncrease(numA, numB) {
  return ((numA - numB) / numB) * 100;
}

export default function Header() {
  const containerRef = useRef(null);
  const backgroundRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollTopPrev, setScrollTopPrev] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [translateXState, setTranslateXState] = useState(0);
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
    setScrollPercentage(
      -(
        getPercentageIncrease(
          backgroundRef.current?.getBoundingClientRect().width -
            window.innerWidth,
          backgroundRef.current?.getBoundingClientRect().width
        ) + 100
      )
    );

    console.log(
      -(
        getPercentageIncrease(
          backgroundRef.current?.getBoundingClientRect().width -
            window.innerWidth,
          backgroundRef.current?.getBoundingClientRect().width
        ) + 100
      )
    );
  }, []);

  useEffect(() => {
    setTranslateXState(
      scale(
        scrollTop,
        0,
        1,
        0,
        getPercentageIncrease(
          backgroundRef.current?.getBoundingClientRect().width -
            window.innerWidth,
          backgroundRef.current?.getBoundingClientRect().width
        )
      )
    );
    // console.log(window.innerWidth);
    // console.log(backgroundRef.current.getBoundingClientRect().width);
  }, [scrollTop]);

  return (
    <div ref={containerRef} className="header">
      <animated.div
        className="animated__layers"
        style={{
          transform: `translateY(${
            scrollTop > 0.8 ? scale(scrollTop, 0.8, 1, 0, -200) : 0
          }%)`,
        }}
      >
        {/* <img
          src="/public/images/minecraft_nether.png"
          className="header__top--gradient"
          style={{
            transform: `translateX(${
              scrollTop < 0.8 ? scale(scrollTop, 0, 0.8, 200, 0) : 0
            }%)`,
          }}
        />
        <img
          src="/public/images/minecraft_normal.png"
          className="header__sky__img"
          style={{
            transform: `translateX(${scale(scrollTop, 0, 0.8, 100, -100)}%)`,
          }}
        /> */}
        <animated.div className="background__container">
          <img
            ref={backgroundRef}
            src="/public/images/background.jpg"
            className="header__mountains__img"
            style={{
              transform: `translateX(${
                translateXState > -33 ? translateXState : -33
              }%)`,
            }}
          />
        </animated.div>
        <animated.div
          className="animated__ghost"
          style={{
            // right: scrollTop * 1000,
            left: `${scale(scrollTop, 0, 1, 0, 100)}%`,
          }}
        >
          <img
            src="/public/images/minecraft-peq.gif"
            className="header__person__img"
          />
        </animated.div>
        {/* <img
          src="/public/images/BG Content.png"
          className="header__bottom--gradient"
        /> */}
      </animated.div>
      {new Array(10).fill(null).map((_, index) => (
        <div className="full__page" key={index} />
      ))}
    </div>
  );
}
