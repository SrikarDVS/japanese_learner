import xml.etree.ElementTree as ET
import json

def parse_kanjidic2(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()

    entries = []

    for character in root.findall("character"):
        entry = {
            "kanji": character.find("literal").text,
            "readings": {"onyomi": [], "kunyomi": [], "nanori": []},
            "meanings": []
        }

        misc = character.find("misc")
        if misc is not None:
            entry["grade"] = misc.find("grade").text if misc.find("grade") is not None else None
            entry["stroke_count"] = misc.find("stroke_count").text if misc.find("stroke_count") is not None else None
            entry["jlpt"] = misc.find("jlpt").text if misc.find("jlpt") is not None else None

        rm = character.find("reading_meaning")
        if rm is not None:
            for rmgroup in rm.findall("rmgroup"):
                for reading in rmgroup.findall("reading"):
                    r_type = reading.get("r_type")
                    if r_type == "ja_on":
                        entry["readings"]["onyomi"].append(reading.text)
                    elif r_type == "ja_kun":
                        entry["readings"]["kunyomi"].append(reading.text)

                for meaning in rmgroup.findall("meaning"):
                    if meaning.get("m_lang") is None or meaning.get("m_lang") == "eng":
                        entry["meanings"].append(meaning.text)

            entry["readings"]["nanori"] = [n.text for n in rm.findall("nanori") if n.text]

        entries.append(entry)

    return entries

if __name__ == "__main__":
    xml_file = "src\data\source_data\kanjidic2.xml"
    json_file = "src\data\dictionary\kanji.json"

    kanji_data = parse_kanjidic2(xml_file)
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(kanji_data, f, ensure_ascii=False, indent=2)

    print(f"Converted {len(kanji_data)} kanji entries to {json_file}")
