import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";
import { runInNewContext } from "vm";

interface InputInterface {
    name: string;
    age: number;
    male: boolean;
}
export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Érettségi megoldás IPv6</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        //1. feladat ip.txt fájl beolvasása
        const megoldás: Megoldás = new Megoldás("ip.txt");
        res.write("1. feladat: Az ip.txt fájl beolvasása\n");

        //2. feladat
        res.write(`\n2. feladat:\nAz állományban ${megoldás.címekSzáma} darab adatsor van.\n`);

        //3. feladat
        res.write(`\n3. feladat:\nA legalacsonyabban tárolt IP-cím:\n${megoldás.legalacsonyabbanTároltCím}\n`);

        //4. feladat
        res.write(`\n4. feladat:\nDokumentációs cím: ${megoldás.fajtaSzám("Dokumentációs")} darab\nGlobális egyedi cím: ${megoldás.fajtaSzám("Globális")} darab\nHelyi egyedi cím: ${megoldás.fajtaSzám("Helyi")} darab\n`);

        //5. feladat
        megoldás.minTizennyolcNullátTartalmazÁllománybaÍr("sok.txt");

        //6. feladat
        const u = url.parse(req.url as string, true).query;
        let sorszám: number = parseInt(u.sorszam as string);
        if (isNaN(sorszám) || sorszám < 1 || sorszám > megoldás.címekSzáma) sorszám = 10;
        res.write(`\n6. feladat:\nKérek egy sorszámot: <input type='text' name='sorszam' min="0" value=${sorszám} style='width:3em;' onChange='this.form.submit();'>\n`);
        res.write(`${megoldás.sorszámadikCím(sorszám)}\n`);
        res.write(`${megoldás.bevezetőNullaElhagyás(sorszám)}\n`);

        //7. feladat
        res.write(`\n7. feladat:\n${megoldás.nullásCsoportokRövidítése(sorszám)}`);

        //Nem a feladat része
        res.write("\n\n<u>GitHub repository:</u> ");
        res.write("<a href='https://github.com/Syadon786/ErettsegiIPv6TsNode/' target='_blank'>GitHub</a><br>");

        res.write("\n\n<u>A sok.txt fájl:</u> (5. feladat)\n");
        fs.readFileSync("sok.txt")
            .toString()
            .split("\n")
            .forEach((i) => res.write(`${i.trim()}<br>`));

        res.write("\n\n<u>A forrás ip.txt fájl:</u>\n");
        fs.readFileSync("ip.txt")
            .toString()
            .split("\n")
            .forEach((i) => res.write(`${i.trim()}<br>`));

        res.write("</pre></form></body></html>");
        res.end();
    }
}
