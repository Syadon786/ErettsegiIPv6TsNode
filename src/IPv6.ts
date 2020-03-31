export default class IPv6 {
    private _tagok: string[] = [];
    constructor(cím: string) {
        this._tagok = cím.split(":");
    }
}
