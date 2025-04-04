export class RawMaterialLookUpModel {
    id: number;
    name: string;
    symbol: string;
    isBiotic: boolean;
    isRecycled: boolean;

    constructor(id: number, name: string, symbol: string, isBiotic: boolean, isRecycled: boolean) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.isBiotic = isBiotic;
        this.isRecycled = isRecycled;
    }
}