import React from "react";
import "./NavbarStudent.css";
import Questions from "../../../images/feynman.jpg";
import { Link } from "react-router-dom";
// import { Fade } from '@material-ui/core';

const NavbarStudent = () => {
  // useState expanded and setExpanded onClick
  // circle back putas
  return (
    <React.Fragment>
      <div className="navbar-fixed col-md-8">
        <nav
          className="nav-wrapper" /*"navbar navbar-expand-md navbar-dark sticky-top"*/
        >
          <Link to="/" className="brand-logo left" /*"navbar-brand"*/>
            <img
              src={Questions}
              alt="react"
              className="img-fluid logo"
              height="64px"
              width="155px"
            />
          </Link>
          {/* The below a tag is the code that renders the hamburger menu when the size of the screen is minimized */}
          <a
            href="/"
            data-target="mobile-demo"
            className="sidenav-trigger right hide-on-med-and-up"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="navbar-nav right hide-on-sml-and-down" /*"navbar-nav"*/>
            <li id="li-nav"
              className={
                window.location.pathname === "/dashboardStudent"
                  ? "active"
                  : ""
              }
            >
              <Link to="/dashboardStudent">Dashboard</Link>
            </li>
            <li
              className={
                window.location.pathname === "/Classroom" ? "active" : ""
              }
            >
              <Link to="/Classroom">Classroom</Link>
            </li>
            <li
              className={`nav-item
                            ${
                              window.location.pathname === "/activitiesStudent"
                                ? "active"
                                : ""
                            }
                            `}
            >
              <Link to="/activitiesStudent">Activities</Link>
            </li>
            <li
              className={`nav-item
                            ${
                              window.location.pathname === "/assignmentsStudent"
                                ? "active"
                                : ""
                            }
                            `}
            >
              <Link to="/assignmentsStudent">Assignments</Link>
            </li>
            <li
              className={`nav-item
                            ${
                              window.location.pathname === "/gradesStudent"
                                ? "active"
                                : ""
                            }
                            `}
            >
              <Link to="/gradesStudent">Grades</Link>
            </li>
            <li
              className={window.location.pathname === "/syllabusStudent" ? "active" : ""}
            >
              <Link to="/syllabusStudent">Syllabi</Link>
            </li>
            <li
              className={
                window.location.pathname === "/logout" ? "active" : ""
              }
            >
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavbarStudent;
