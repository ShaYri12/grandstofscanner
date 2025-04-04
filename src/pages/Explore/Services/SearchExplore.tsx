import axios from 'axios';
import i18next from 'i18next';
import { ExploreModel } from '../Models/ExploreModel';
import { MainTreeItemModel } from '../Models/MainTreeItemModel';
import { ProductGroupMainApplicationModel } from '../Models/ProductGroupMainApplicationModel';
import { getLocaleCode } from '../../../locales/CountryCodeToLocaleCode';
import { RawMaterialLookUpModel } from '../Models/RawMaterialLookUpModel';

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const productGroupsByName = async (name: string): Promise<MainTreeItemModel[]> => {
  return await apiService
    .get<ExploreModel>('/explore/productgroups/' + name + '?lang=' + getLocaleCode(i18next.language))
    .then((result) => {
      return result.data.productGroupsTree;
    })
    .catch((error) => {
      console.error('Error: ', error);
      return [];
    });
};

export const allProductGroups= async (): Promise<MainTreeItemModel[]> => {
  return await apiService
    .get<ExploreModel>('/explore/productgroups/?lang=' + getLocaleCode(i18next.language))
    .then((result) => {
      return result.data.productGroupsTree;
    })
    .catch((error) => {
      console.error('Error: ', error);
      return [];
    });
};

export const productGroupsByProductCategory = async (): Promise<ProductGroupMainApplicationModel[]> => {
  return await apiService
    .get<ProductGroupMainApplicationModel[]>('/explore/maincategories?lang=' + getLocaleCode(i18next.language))
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('Error: ', error);
      return [];
    });
};

export const allRawMaterials = async (): Promise<RawMaterialLookUpModel[]> => {
  return await apiService
    .get<RawMaterialLookUpModel[]>('/explore/rawmaterials?lang=' + getLocaleCode(i18next.language))
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('Error: ', error);
      return [];
    });
};