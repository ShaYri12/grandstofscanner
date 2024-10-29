import { useTranslation } from "react-i18next";

interface Factsheet {
  symbol: string;
  title: string;
  linkText: string;
}

interface ProductGroup {
  code: string;
  title: string;
  linkText: string;
  info: string[]; // Explicitly define as an array of strings
  isAlt: boolean;
}

interface ProductGroupTranslations {
  breadcrumb: {
    home: string;
    exploreReview: string;
    review: string;
  };
  heading1: string;
  paragraphs: {
    intro1: string;
    intro2: string;
    selectedGroups: string;
    riskAction: string;
    note: string;
  };
  heading2: string;
  actionButton: string;
  factsheets: Factsheet[];
  productGroups: ProductGroup[];
}

export const useProductGroupData = (): ProductGroupTranslations => {
  const { t } = useTranslation();

  return {
    breadcrumb: {
      home: t("productGroup.breadcrumb.home"),
      exploreReview: t("productGroup.breadcrumb.exploreReview"),
      review: t("productGroup.breadcrumb.review"),
    },
    heading1: t("productGroup.heading1"),
    paragraphs: {
      intro1: t("productGroup.paragraphs.intro1"),
      intro2: t("productGroup.paragraphs.intro2"),
      selectedGroups: t("productGroup.paragraphs.selectedGroups"),
      riskAction: t("productGroup.paragraphs.riskAction"),
      note: t("productGroup.paragraphs.note"),
    },
    heading2: t("productGroup.heading2"),
    actionButton: t("productGroup.actionButton"),
    factsheets: [
      {
        symbol: "Fe",
        title: t("productGroup.factsheets.0.title"),
        linkText: t("productGroup.factsheetLinkText"),
      },
      {
        symbol: "Sb",
        title: t("productGroup.factsheets.1.title"),
        linkText: t("productGroup.factsheetLinkText"),
      },
      {
        symbol: "Fe",
        title: t("productGroup.factsheets.2.title"),
        linkText: t("productGroup.factsheetLinkText"),
      },
    ],
    productGroups: [
      {
        code: "340600",
        title: t("productGroup.productGroups.0.title"),
        linkText: t("productGroup.productGroups.0.linkText"),
        info: t("productGroup.productGroups.0.info", {
          returnObjects: true,
        }) as string[], // Cast to string[]
        isAlt: false,
      },
      {
        code: "340600",
        title: t("productGroup.productGroups.1.title"),
        linkText: t("productGroup.productGroups.1.linkText"),
        info: t("productGroup.productGroups.1.info", {
          returnObjects: true,
        }) as string[], // Cast to string[]
        isAlt: true,
      },
      {
        code: "340600",
        title: t("productGroup.productGroups.2.title"),
        linkText: t("productGroup.productGroups.2.linkText"),
        info: t("productGroup.productGroups.2.info", {
          returnObjects: true,
        }) as string[], // Cast to string[]
        isAlt: false,
      },
    ],
  };
};
