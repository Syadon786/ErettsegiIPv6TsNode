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
    public get fajtaSzám(): number[] {
        const fajtaSzám: number[] = [3];
        fajtaSzám[0] = this._címek.filter((x) => x.fajta == "Dokumentációs").length;
        fajtaSzám[1] = this._címek.filter((x) => x.fajta == "Globális").length;
        fajtaSzám[2] = this._címek.filter((x) => x.fajta == "Helyi").length;
        return fajtaSzám;
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
}
