import IPv6 from "../IPv6";

describe("IPv6 osztály unit tesztek", () => {
    const instance: IPv6 = new IPv6("2001:0db8:5005:0003:0b02:0029:fe09:a861");
    const instance2: IPv6 = new IPv6("2001:0e00:00f9:00d4:7300:0096:0801:0201");
    const instance3: IPv6 = new IPv6("fcb6:0600:e707:a30c:3007:0d05:0100:aadf");
    const instance4: IPv6 = new IPv6("fd3f:0008:000b:6008:0000:0000:0d5d:a003");

    it("IPv6 osztálypéldányok ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(IPv6);
        expect(instance2).toBeInstanceOf(IPv6);
        expect(instance3).toBeInstanceOf(IPv6);
        expect(instance4).toBeInstanceOf(IPv6);
    });
    it("Eredeti cím ellenőrzése", async () => {
        expect(instance.eredetiCím).toBe("2001:0db8:5005:0003:0b02:0029:fe09:a861");
        expect(instance2.eredetiCím).toBe("2001:0e00:00f9:00d4:7300:0096:0801:0201");
        expect(instance3.eredetiCím).toBe("fcb6:0600:e707:a30c:3007:0d05:0100:aadf");
        expect(instance4.eredetiCím).toBe("fd3f:0008:000b:6008:0000:0000:0d5d:a003");
    });

    it("Fajta ellenőrzés", async () => {
        expect(instance.fajta).toBe("Dokumentációs");
        expect(instance2.fajta).toBe("Globális");
        expect(instance3.fajta).toBe("Helyi");
        expect(instance4.fajta).toBe("Helyi");
    });

    it("Bevezető nullák elhagyásának ellenőrzése", async () => {
        expect(instance.bevezetőNullaElhagyás).toBe("2001:db8:5005:3:b02:29:fe09:a861");
        expect(instance2.bevezetőNullaElhagyás).toBe("2001:e00:f9:d4:7300:96:801:201");
        expect(instance3.bevezetőNullaElhagyás).toBe("fcb6:600:e707:a30c:3007:d05:100:aadf");
        expect(instance4.bevezetőNullaElhagyás).toBe("fd3f:8:b:6008:0:0:d5d:a003");
    });
    it("Nullákszáma ellenőrzése", async () => {
        expect(instance.nullákSzáma).toBe(13);
        expect(instance2.nullákSzáma).toBe(17);
        expect(instance3.nullákSzáma).toBe(12);
        expect(instance4.nullákSzáma).toBe(19);
    });
});
