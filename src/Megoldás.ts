import fs from "fs";
import IPv6 from "./IPv6";

export default class Megoldás {
    private _ipv6címek: IPv6[] = [];

    public get címekSzáma(): number {
        return this._ipv6címek.length;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach((i) => {
                const aktSor = i.trim();
                if (aktSor) {
                    this._ipv6címek.push(new IPv6(aktSor));
                }
            });
    }
}
