import React from 'react';
import { useParams } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

function HeroCard1() {
    const { t, i18n } = useTranslation(); 
    const { lang } = useParams();
    const {boxline1,boxline2,boxline3,boxbutton,boxline4,boxline5,boxline6}= t("box1");
  return (
    <>
    <p>{boxline1}</p>
    </>
  );
}

export default HeroCard1;









