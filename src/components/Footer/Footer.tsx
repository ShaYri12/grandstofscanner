import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const { fone, ftwo, fthree, ffour } = t("footer");
  return (
    <>
      <div className={`${styles.footerWrapper}  d-flex justify-content-start align-items-center `}>
        <ul className={`${styles.footerUl} d-flex justify-content-start align-items-center gap-4`}>
          <li className={`${styles.footerLi}`}>{fone}</li>
          <li className={`${styles.footerLi}`}>{ftwo}</li>
          <li className={`${styles.footerLi}`}>{fthree}</li>
          <li className={`${styles.footerLi}`}>{ffour}</li>
        </ul>
      </div>
    </>
  );
}

export default Footer;
