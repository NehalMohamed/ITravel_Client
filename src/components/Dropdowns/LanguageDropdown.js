import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';
import i18n  from "../../i18n";

const LanguageDropdown = () => {
  const { t } = useTranslation();
  
  const currentLanguage = i18n.language;
  
  const languageDisplay = {
    en: 'EN',
    de: 'DE'
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown className="icon-dropdown">
      <Dropdown.Toggle as="button" className="icon-btn" aria-label={t('language.language')}>
        <FaGlobe />
        <span className="icon-text">{languageDisplay[currentLanguage] || currentLanguage}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          <span className="flag">EN</span> {t('language.english')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("de")}>
          <span className="flag">DE</span> {t('language.german')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;