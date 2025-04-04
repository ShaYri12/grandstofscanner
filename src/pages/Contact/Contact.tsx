import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/General/Breadcrumb/Breadcrumb";
import ContactForm from "./ContactForm/ContactForm";
import styles from "./Contact.module.css";

interface LangParam extends Record<string, string | undefined> {
  lang: string;
}

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<LangParam>();

  // Language change is now managed centrally in App.tsx

  const breadcrumbItems = [
    { label: t("contact.breadcrumb.home"), url: "/" },
    { label: t("contact.breadcrumb.current") },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className={styles.title}>{t("contact.title")}</h1>

      <p className={styles.description}>{t("contact.description")}</p>

      <ContactForm />
    </div>
  );
};

export default ContactPage;
