import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useAuthModal } from '../AuthComp/AuthModal';


const ProfileDropdown = () => {
    const { t } = useTranslation();
    const { openAuthModal } = useAuthModal();

    return (
        <Dropdown className="icon-dropdown">
            <Dropdown.Toggle as="button" className="icon-btn profile-btn" aria-label={t('main_navbar.profile')}>
                <FaUser />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
                <Dropdown.Item
                 onClick={() => openAuthModal("login")}>
                    {t('main_navbar.login_signup')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#profile">{t('main_navbar.my_profile')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout">{t('main_navbar.logout')}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;