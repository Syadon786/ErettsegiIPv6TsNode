import fs from "fs";
import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldás = new Megoldás("ip.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldás);
    });

    it("Címek számának ellenőrzése", async () => {
        expect(instance.címekSzáma).toBe(375);
    });

    it("Legalacsonyabban tárolt cím ellenőrzése", async () => {
        expect(instance.legalacsonyabbanTároltCím).toBe("2001:0db8:0000:00b9:0800:0f00:e02a:71ac");
    });

    it("Fajták számának ellenőrzése", async () => {
        expect(instance.fajtaSzám("Dokumentációs")).toBe(106);
        expect(instance.fajtaSzám("Globális")).toBe(120);
        expect(instance.fajtaSzám("Helyi")).toBe(149);
    });

    it("Adott sorszámú cím ellenőrzése", async () => {
        expect(instance.sorszámadikCím(10)).toBe("fcef:b0e7:7d20:0000:0000:0000:3b95:0565");
        expect(instance.sorszámadikCím(374)).toBe("fc11:0000:0000:0000:00a0:0000:0000:2222");
    });

    it("Bevezető nulla elhagyás ellenőrzése", async () => {
        expect(instance.bevezetőNullaElhagyás(10)).toBe("fcef:b0e7:7d20:0:0:0:3b95:565");
        expect(instance.bevezetőNullaElhagyás(374)).toBe("fc11:0:0:0:a0:0:0:2222");
    });

    it("Nullás csoportok rövidítésének ellenőrzése", async () => {
        expect(instance.nullásCsoportokRövidítése(10)).toBe("fcef:b0e7:7d20::3b95:565");
        expect(instance.nullásCsoportokRövidítése(374)).toBe("fc11::a0:0:0:2222");
        expect(instance.nullásCsoportokRövidítése(100)).toBe("Nem rövidíthető tovább.");
    });

    it("Fájlok összehasonlítása", async () => {
        expect(fs.readFileSync("sok.txt").toString()).toBe(fs.readFileSync("sokOH.txt").toString());
    });
});
