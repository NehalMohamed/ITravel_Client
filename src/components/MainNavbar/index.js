import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSearch, FaShoppingBasket, FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import ExcursionsDropdown from "../Dropdowns/ExcursionsDropdown";
import ProfileDropdown from "../Dropdowns/ProfileDropdown";

const MainNavbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const wishlistCount = useSelector((state) => state.tours.wishlistCount);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    navigate("/Wishlist");
  };

  return (
    <Navbar expand="lg" className="main-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          <img
            src="/ItravelLogo.png"
            alt={t("main_navbar.travel")}
            className="logo-img"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              end
            >
              {t("main_navbar.home")}
            </Nav.Link>

            <ExcursionsDropdown />

            <Nav.Link
              as={NavLink}
              to="/ComingSoon"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {t("main_navbar.transfer_services")}
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/AboutUs"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {t("main_navbar.about_us")}
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/Contact"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {t("main_navbar.contact")}
            </Nav.Link>

            {/* Icon Actions Section */}
            <div className="navbar-icons">
              {/* Search Icon */}
              <div className="search-container">
                <button
                  className="icon-btn search-btn"
                  onClick={() => setShowSearch(!showSearch)}
                  aria-label="search"
                >
                  <FaSearch />
                </button>
                {showSearch && (
                  <div className="search-dropdown">
                    <input
                      type="text"
                      placeholder={t("main_navbar.search_placeholder")}
                      className="search-input"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <LanguageDropdown />

              {/* Wishlist/Heart Icon */}
              <button
                className="icon-btn wishlist-btn"
                aria-label="wishlist"
                onClick={handleWishlistClick}
              >
                <FaHeart />
                {wishlistCount > 0 && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </button>

              {/* Shopping Basket */}
              <button
                className="icon-btn basket-btn"
                aria-label="shopping_basket"
              >
                <FaShoppingBasket />
                {/* <span className="badge">2</span> */}
              </button>

              <ProfileDropdown />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
