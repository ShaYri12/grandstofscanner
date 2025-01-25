import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { useNavigate } from "react-router-dom";

const CookieBanner = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, []);

  return show ? (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="userConsent"
      style={{
        background: "rgb(19, 38, 66)",
        color: "white",
        fontSize: "16px",
        padding: "10px",
        textAlign: "center",
        justifyContent: "center",
      }}
      buttonStyle={{
        background: "#56a9de",
        color: "rgb(19, 38, 66)",
        fontSize: "16px",
        borderRadius: "5px",
        padding: "8px 15px",
      }}
      declineButtonStyle={{
        background: "#f2b34d",
        color: "rgb(107, 31, 31)",
        fontSize: "16px",
        borderRadius: "5px",
        padding: "8px 15px",
      }}
    >
      <span>
        This website uses cookies to enhance the user experience.{" "}
        <span
          style={{
            color: "#FFD700",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => navigate("/en/privacy")}
        >
          Learn more
        </span>
      </span>
    </CookieConsent>
  ) : null;
};

export default CookieBanner;
