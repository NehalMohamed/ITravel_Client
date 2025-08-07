import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from 'react-icons/fa';

const ExcursionsDropdown = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const timeoutRef = useRef(null);

    const handleLocationClick = (location) => {
        navigate(`/excursions/${location}`);
        setShow(false); // Close dropdown after navigation
    };

    const handleMainExcursionsClick = (e) => {
        e.preventDefault();
        navigate('/excursions');
    };

    const handleMouseEnter = () => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShow(true);
    };

    const handleMouseLeave = () => {
        // Add a small delay before closing
        timeoutRef.current = setTimeout(() => {
            setShow(false);
        }, 150);
    };

    // Clear timeout on component unmount
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div 
            className="nav-dropdown-hover"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Dropdown show={show} onToggle={() => {}} className="nav-dropdown">
                <Dropdown.Toggle 
                    as="a" 
                    className="nav-item dropdown-toggle"
                    onClick={handleMainExcursionsClick}
                    href="#"
                >
                    {t('main_navbar.egypt_excursions')}
                    <FaChevronDown className="dropdown-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Dropdown.Item onClick={() => handleLocationClick('hurghada')}>
                        {t('main_navbar.hurghada')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('makadi-bay')}>
                        {t('main_navbar.makadi_bay')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('el-gouna')}>
                        {t('main_navbar.el_gouna')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('soma-bay')}>
                        {t('main_navbar.soma_bay')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('sahl-hashesh')}>
                        {t('main_navbar.sahl_hashesh')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('el-quseir')}>
                        {t('main_navbar.el_quseir')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('marsa-alam')}>
                        {t('main_navbar.marsa_alam')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLocationClick('egypt-roundtrips')}>
                        {t('main_navbar.egypt_roundtrips')}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ExcursionsDropdown;