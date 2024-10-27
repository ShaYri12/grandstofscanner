export type Material = {
  id: string;
  symbol: string;
  name: string;
  factsheetLink: string;
  riskLevel: string;
};

export type ProductGroup = {
  id: string;
  name: string;
  materials: Material[];
};
