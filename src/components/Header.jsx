import React, { useRef, useEffect, useState } from "react";
import "./Header.scss";
import { useScroll, animated, useSpring } from "@react-spring/web";

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function getPercentageIncrease(numA, numB) {
  return ((numA - numB) / numB) * 100;
}

function animationHandler(scroll, minRange, maxRange, top, left) {
  if (scroll > minRange && scroll <= maxRange)
    return {
      top: `${scale(scroll, minRange, maxRange, 120, top)}%`,
      transform: `rotate(${scale(scroll, minRange, maxRange, 15, 0)}deg)`,
      left: `${left}%`,
    };
  else if (scroll > maxRange)
    return {
      top: `${top}%`,
      transform: `rotate(0deg)`,
      left: `${left}%`,
    };
  else
    return {
      top: "120%",
    };
}

export default function Header() {
  const backgroundRef = useRef();
  const containerRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [translateXState, setTranslateXState] = useState(0);
  const [right, setRight] = useState(0);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      setScrollTop(scrollYProgress);
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
  }, [scrollTop]);

  useEffect(() => {
    console.log(scrollTop);
  }, [scrollTop]);

  return (
    <div ref={containerRef} className="header">
      <h2
        className="scroll__notif"
        style={{
          opacity: `${scrollTop < 0.1 ? scale(scrollTop, 0, 0.1, 1, 0) : 0}`,
        }}
      >
        Scroll
      </h2>
      <animated.div className="animated__layers">
        <animated.div className="background__container">
          <img
            ref={backgroundRef}
            src="/public/images/background.jpg"
            className="header__background__img"
            style={{
              transform: `translateX(${
                translateXState >
                -(
                  getPercentageIncrease(
                    backgroundRef.current?.getBoundingClientRect().width -
                      window.innerWidth,
                    backgroundRef.current?.getBoundingClientRect().width
                  ) + 100
                )
                  ? translateXState
                  : -(
                      getPercentageIncrease(
                        backgroundRef.current?.getBoundingClientRect().width -
                          window.innerWidth,
                        backgroundRef.current?.getBoundingClientRect().width
                      ) + 100
                    )
              }%)`,
            }}
          />
        </animated.div>
        <animated.div
          className="animated__steve"
          style={{
            left: `${scale(scrollTop, 0, 0.8, -20, 100)}%`,
          }}
        >
          <img
            src="/public/images/minecraft-peq.gif"
            className="header__steve__img"
          />
        </animated.div>
      </animated.div>
      {new Array(10).fill(null).map((_, index) => (
        <div className="full__page" key={index} />
      ))}
      <a
        className={`menu__item`}
        style={{
          ...animationHandler(scrollTop, 0.8, 0.87, 20, 20),
        }}
      >
        blogs
      </a>
      <a
        className={`menu__item`}
        style={{
          ...animationHandler(scrollTop, 0.87, 0.94, 35, 25),
        }}
      >
        about us
      </a>
      <a
        className={`menu__item`}
        style={{
          ...animationHandler(scrollTop, 0.94, 1, 50, 30),
        }}
      >
        products
      </a>
    </div>
  );
}
