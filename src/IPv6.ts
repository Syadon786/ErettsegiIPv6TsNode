export default class IPv6 {
    private _tagok: string[] = [];

    public get eredetiCím(): string {
        return this._tagok.join(":");
    }

    public get fajta(): string {
        if (this._tagok[0] == "2001" && this._tagok[1] == "0db8") {
            return "Dokumentációs";
        } else if (this._tagok[0] == "2001" && this._tagok[1].startsWith("0e")) {
            return "Globális";
        } else if (this._tagok[0].startsWith("fc") || this._tagok[0].startsWith("fd")) {
            return "Helyi";
        }
        return "Ismeretlen";
    }
    public get nullákSzáma(): number {
        let nullákSzáma = 0;
        for (const karakter of this.eredetiCím) {
            if (karakter == "0") {
                nullákSzáma++;
            }
        }
        return nullákSzáma;
    }
    constructor(cím: string) {
        this._tagok = cím.split(":");
    }
}
