import { useState } from "react";
import { Link } from "react-router-dom";

import logoIcon from "/images/logo-udemy.svg";

import css from "./CourseVideoNavbar.module.css";

const CourseVideoNavbar = (props) => {
  const { data = {} } = props;
  const { title = "" } = data;

  return (
    <div className={css.outerDiv}>
      <div className={css.left}>
        <Link to="/" className={css.logoBox}>
          <img src={logoIcon} alt="logo" className={css.logo} />
        </Link>
      </div>
      <div className={css.right}>
        {/* Progress and Share moved to Video Player */}
      </div>
    </div>
  );
};

export default CourseVideoNavbar;
