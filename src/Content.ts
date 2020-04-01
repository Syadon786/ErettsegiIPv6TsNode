import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";

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
        //2. feladat
        res.write(`2. feladat:\nAz állományban ${megoldás.címekSzáma} darab adatsor van.\n`);
        //3. feladat
        res.write(`\n3. feladat:\nA legalacsonyabban tárolt IP-cím:\n${megoldás.legalacsonyabbanTároltCím}\n`);
        //4. feladat
        res.write(`\n4. feladat:\nDokumentációs cím: ${megoldás.fajtaSzám("Dokumentációs")} darab\nGlobális egyedi cím: ${megoldás.fajtaSzám("Globális")} darab\nHelyi egyedi cím: ${megoldás.fajtaSzám("Helyi")} darab`);
        //  res.write(`3. feladat: Kérem a korod [0-99]: <input type='text' name='kor' value=${kor} style='width:3em;' onChange='this.form.submit();'>\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
