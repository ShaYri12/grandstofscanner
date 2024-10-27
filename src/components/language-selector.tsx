import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const languages = [
    { code: "en", lang: "En",  icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERnbE2vj5IueStB7LDbcN0TSrOcJSF6o9Jg&s" },
    { code: "nl", lang: "Nl", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFFZN3Ee-yph_FyJWXQII9-rTs8dRwSS4kQ&s" },
];
const LanguageSelector = ({txtclr,txtclr2}) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState(i18n.language);
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLang(lng);
        const currentPath = window.location.pathname.split('/');
        currentPath[1] = lng;
        navigate(currentPath.join('/')); 
    };
    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);
    return (
        <div className="cursor-pointer">
            {languages.map((lng, index) => {
                return (
                    <span
                        className={` h-0 p-0 bg-transparent cursor-pointer outline-[0px] inline-block border-[5px] text-secondary fs-6 fw-bolder ${lng.code === selectedLang ? txtclr : ""}`}
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        style={{ cursor: 'pointer' }}
                    >
                        {lng.lang}
                        <span className="" style={{margin:"0px 5px",  filter: lng.code === selectedLang ? 'none' : 'grayscale(100%)'}}><img className="" src={lng.icon} alt="" style={{height:'15px', width:'15px', borderRadius:'50%', margin:'0px 5px'}} />{index < languages.length - 1 &&(<span style={{ color: txtclr2 }}> | </span>)}</span>
                        
                    </span>
                );
            })}
        </div>
    );
};

export default LanguageSelector;
