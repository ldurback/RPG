namespace SideScrollerRPG {
    abstract class Item {
    }

    export class ItemManager {
        itemDictionary: { [index: string]: Item };
    }
}