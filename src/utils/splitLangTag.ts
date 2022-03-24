// splits BCP 47 language tag into individual language and country codes
// returns tuple with 2 string elements: [ISO 639-1 Language Code, Alpha-2 ISO 3166 Country Code]
// "en-US" => ["en", "US"]
const splitLangTag = (langTag: string): [string, string] => {
  const result = langTag.split("-");
  return [result[0], result[1]];
};

export default splitLangTag;
