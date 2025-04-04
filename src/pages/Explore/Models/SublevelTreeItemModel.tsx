import { ProductGroupTreeItemModel } from "./ProductGroupTreeItemModel";

export class SublevelTreeItemModel {
    constructor() {}
    text: string = "";
    nodes: ProductGroupTreeItemModel[] = [];
}