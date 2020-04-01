import fs from "fs";
import IPv6 from "./IPv6";

export default class Megoldás {
    private _címek: IPv6[] = [];

    public get címekSzáma(): number {
        return this._címek.length;
    }
    public get legalacsonyabbanTároltCím(): string {
        let legalacsonyabbanTároltCím = this._címek[0].eredetiCím;
        for (const cím of this._címek) {
            if (cím.eredetiCím < legalacsonyabbanTároltCím) {
                legalacsonyabbanTároltCím = cím.eredetiCím;
            }
        }
        return legalacsonyabbanTároltCím;
    }
    public fajtaSzám(fajta: string): number {
        return this._címek.filter((x) => x.fajta == fajta).length;
    }
    public sorszámadikCím(sorszám: number): string {
        return this._címek[sorszám - 1].eredetiCím;
    }
    public bevezetőNullaElhagyás(sorszám: number): string {
        let rövidítettCím;
        if (this._címek[sorszám - 1].eredetiCím.includes("0000")) {
            rövidítettCím = this._címek[sorszám - 1].eredetiCím.replace(/0000/g, "0");
            return rövidítettCím;
        }
        return "Nem rövidíthető";
    }
    public nullásCsoportokRövidítése(sorszám: number): string {
        let mégrövidítettebbCím: string = this.bevezetőNullaElhagyás(sorszám);
        let rövidíthető = false;
        while (mégrövidítettebbCím.includes(":0:0:")) {
            mégrövidítettebbCím = mégrövidítettebbCím.replace(/:0:0:/g, "::");
            rövidíthető = true;
        }
        while (mégrövidítettebbCím.includes(":::")) {
            mégrövidítettebbCím = mégrövidítettebbCím.replace(/:::/g, "::");
        }
        if (rövidíthető) {
            return mégrövidítettebbCím;
        }
        return "Nem rövidíthető tovább.";
    }
    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach((i) => {
                const aktSor = i.trim();
                if (aktSor) {
                    this._címek.push(new IPv6(aktSor));
                }
            });
    }

    public minTizennyolcNullátTartalmazÁllománybaÍr(állomány: string): void {
        const ki: string[] = [];
        for (let sorSzám = 0; sorSzám < this._címek.length; sorSzám++) {
            const cím = this._címek[sorSzám];
            if (cím.nullákSzáma >= 18) {
                ki.push((sorSzám + 1).toString() + " " + cím.eredetiCím);
            }
        }
        fs.writeFileSync(állomány, ki.join("\r\n") + "\r\n");
    }
}
