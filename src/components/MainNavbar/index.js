import { useState } from "react";
import { useSelector } from "react-redux";
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

  return (
    <Navbar expand="lg" className="main-navbar" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="brand-logo">
          <img src="/ItravelLogo.png" alt={t('main_navbar.travel')} className="logo-img" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/" className="nav-item active">
              {t('main_navbar.home')}
            </Nav.Link>

           <ExcursionsDropdown />

            <Nav.Link href="#transfer" className="nav-item">
              {t('main_navbar.transfer_services')}
            </Nav.Link>

            <Nav.Link href="#about" className="nav-item">
              {t('main_navbar.about_us')}
            </Nav.Link>

            <Nav.Link href="#contact" className="nav-item">
              {t('main_navbar.contact')}
            </Nav.Link>

            {/* Icon Actions Section */}
            <div className="navbar-icons">
              {/* Search Icon */}
              <div className="search-container">
                <button className="icon-btn search-btn" onClick={() => setShowSearch(!showSearch)} aria-label="search">
                  <FaSearch />
                </button>
                {showSearch && (
                  <div className="search-dropdown">
                    <input type="text" placeholder={t('main_navbar.search_placeholder')} className="search-input" autoFocus />
                  </div>
                )}
              </div>

              <LanguageDropdown />

              {/* Wishlist/Heart Icon */}
              <button className="icon-btn wishlist-btn" aria-label="wishlist">
                <FaHeart />
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </button>

              {/* Shopping Basket */}
              <button className="icon-btn basket-btn" aria-label="shopping_basket">
                <FaShoppingBasket />
                {/* <span className="badge">2</span> */}
              </button>

              <ProfileDropdown/>
              
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
