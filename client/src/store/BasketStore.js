import { makeAutoObservable } from "mobx";

export default class BasketStore {
    constructor() {
        this._basket = {};
        this._basketProducts = [];
        makeAutoObservable(this);
    }

    setBasket(basket) {
        this._basket = basket;
    }

    get basket() {
        return this._basket;
    }
}
