const fs = require("fs");
const xml2js = require("xml2js");
const wanakana = require("wanakana");

const parser = new xml2js.Parser({
    explicitArray: false,
    normalize: true,
    strict: false
});

fs.readFile("src\\data\\source_data\\JMdict_e.xml", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading XML file:", err);
        return;
    }

    parser.parseString(data, (err, result) => {
        if (err) {
            console.error("Error parsing XML:", err);
            return;
        }

        const entries = [];
        const words = result.JMDICT.ENTRY || [];

        words.forEach(entry => {
            const wordEntry = {
                kanji: [],
                kana: [],
                meanings: [],
                romaji: []
            };

            if (entry.K_ELE) {
                if (Array.isArray(entry.K_ELE)) {
                    wordEntry.kanji = entry.K_ELE.map(k => k.KEB);
                } else {
                    wordEntry.kanji.push(entry.K_ELE.KEB);
                }
            }

            if (entry.R_ELE) {
                if (Array.isArray(entry.R_ELE)) {
                    wordEntry.kana = entry.R_ELE.map(r => r.REB);
                } else {
                    wordEntry.kana.push(entry.R_ELE.REB);
                }
            }

            if (wordEntry.kana.length > 0) {
                wordEntry.romaji = wordEntry.kana.map(kana => wanakana.toRomaji(kana));
            }

            if (entry.SENSE) {
                const senses = Array.isArray(entry.SENSE) ? entry.SENSE : [entry.SENSE];
                senses.forEach(sense => {
                    if (sense.GLOSS) {
                        if (Array.isArray(sense.GLOSS)) {
                            wordEntry.meanings.push(...sense.GLOSS.map(g => g._ || g));
                        } else {
                            wordEntry.meanings.push(sense.GLOSS._ || sense.GLOSS);
                        }
                    }
                });
            }

            entries.push(wordEntry);
        });

        fs.writeFile("src\\data\\dictionary\\vocabulary.json", JSON.stringify(entries, null, 2), "utf-8", err => {
            if (err) {
                console.error("Error writing JSON file:", err);
            } else {
                console.log(`Converted ${entries.length} vocabulary entries to vocabulary.json`);
            }
        });
    });
});