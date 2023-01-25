import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import "./Navigation.scss";

export default function Navigation() {
  return (
    <nav className="navigation">
      <span className="navigation__logo">mntn</span>
      <ul className="navigation__links--container">
        <li className="navigation__links__item">Equipment</li>
        <li className="navigation__links__item">About us</li>
        <li className="navigation__links__item">Blog</li>
      </ul>
      <div className="navigation__account--container">
        <FontAwesomeIcon
          icon={faCircleUser}
          className="navigation__account__icon"
        />
        <span className="navigation__account__title">Account</span>
      </div>
    </nav>
  );
}
