import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

interface Language {
  code: string;
  lang: string;
  icon: string;
}

const languages: Language[] = [
  {
    code: "en",
    lang: "En",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERnbE2vj5IueStB7LDbcN0TSrOcJSF6o9Jg&s",
  },
  {
    code: "nl",
    lang: "Nl",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFFZN3Ee-yph_FyJWXQII9-rTs8dRwSS4kQ&s",
  },
];

interface LanguageSelectorProps {
  txtclr: string;
  txtclr2: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  txtclr,
  txtclr2,
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    localStorage.setItem("i18nextLng", lng);
    i18n.changeLanguage(lng);
    setSelectedLang(lng);

    // Preserve query parameters when changing language
    const pathParts = location.pathname.split("/");
    let newPath: string;

    if (pathParts.length > 1) {
      pathParts[1] = lng;
      newPath = pathParts.join("/");
    } else {
      newPath = `/${lng}/home`;
    }

    // Append the search parameters if they exist
    if (location.search) {
      navigate(`${newPath}${location.search}`);
    } else {
      navigate(newPath);
    }
  };

  return (
    <div className="cursor-pointer">
      {languages.map((lng, index) => (
        <span
          className={`h-0 p-0 bg-transparent cursor-pointer outline-[0px] inline-block border-[5px] text-secondary fw-bolder ${
            lng.code === selectedLang ? txtclr : ""
          }`}
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
          style={{ cursor: "pointer" }}
        >
          {lng.lang}
          <span
            style={{
              margin: "0px 5px",
              filter: lng.code === selectedLang ? "none" : "grayscale(100%)",
            }}
          >
            <img
              src={lng.icon}
              alt=""
              style={{
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                margin: "0px 3px",
              }}
            />
            {index < languages.length - 1 && (
              <span style={{ color: txtclr2 }}> | </span>
            )}
          </span>
        </span>
      ))}
    </div>
  );
};

export default LanguageSelector;
