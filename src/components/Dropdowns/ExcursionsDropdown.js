import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';

const ExcursionsDropdown = () => {
    const { t } = useTranslation();

    return (
        <Dropdown className="nav-dropdown">
            <Dropdown.Toggle as="a" className="nav-item dropdown-toggle">
                {t('main_navbar.egypt_excursions')}
                <FaChevronDown className="dropdown-icon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#hurghada">{t('main_navbar.hurghada')}</Dropdown.Item>
                <Dropdown.Item href="#makadi_bay">{t('main_navbar.makadi_bay')}</Dropdown.Item>
                <Dropdown.Item href="#el_gouna">{t('main_navbar.el_gouna')}</Dropdown.Item>
                <Dropdown.Item href="#soma_bay">{t('main_navbar.soma_bay')}</Dropdown.Item>
                <Dropdown.Item href="#sahl_hashesh">{t('main_navbar.sahl_hashesh')}</Dropdown.Item>
                <Dropdown.Item href="#el_quseir">{t('main_navbar.el_quseir')}</Dropdown.Item>
                <Dropdown.Item href="#marsa_alam">{t('main_navbar.marsa_alam')}</Dropdown.Item>
                <Dropdown.Item href="#egypt_roundtrips">{t('main_navbar.egypt_roundtrips')}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ExcursionsDropdown;