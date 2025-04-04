import { SublevelTreeItemModel } from "./SublevelTreeItemModel"

export class MainTreeItemModel {
    constructor() {}
    id: number | undefined
    text: string = ""
    nodes: SublevelTreeItemModel[] = []
}