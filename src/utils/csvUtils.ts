import {PersonField} from '../typings';

export async function* textFileLineIterator(
  reader: ReadableStreamDefaultReader<Uint8Array>,
) {
  const utf8Decoder = new TextDecoder("utf-8");
  let { value: chunk, done: readerDone } = await reader.read();
  let strChunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

  const re = /\r\n|\n|\r/gm;
  let startIndex = 0;

  while (true) {
    const result = re.exec(strChunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      const remainder = strChunk.substring(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      strChunk =
        remainder + (chunk ? utf8Decoder.decode(chunk, { stream: true }) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }

    yield strChunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < strChunk.length) {
    // last line didn't end in a newline char
    yield strChunk.substring(startIndex);
  }
}

export const csvLineToArrayParser = (data: string[]) => {
  return data.map((line: string) => {
    const fields = [];
    for (let i = 0; i < line.length; ) {
      // parse quoted fields
      if (line[i] === '"') {
        const nextIndex = line.indexOf('"', i + 1);
        fields.push(line.substring(i + 1, nextIndex));
        i = nextIndex + 1;
        continue;
        // skip spaces and commas
      } else if ([",", " "].includes(line[i])) {
        i++;
        continue;
        // parse unquoted fields
      } else {
        const nextIndex = line.indexOf(",", i);
        if (nextIndex === -1) {
          fields.push(line.substring(i));
          break;
        } else {
          fields.push(line.substring(i, nextIndex));
          i = nextIndex + 1;
        }
      }
    }
    return fields;
  });
}

export const parseBirthday = (csvRow: string[]) : [string, Date] => {
  let birthDate = new Date(csvRow[PersonField.BIRTHDAY]);
  let birthday: string = "Unknown";
  
  /** Could be useful information if running a logging service */
  if (isNaN(birthDate.valueOf())) {
    console.error(
      `Invalid birth date for ${csvRow[PersonField.FIRST_NAME]}, ${csvRow[PersonField.LAST_NAME]}: ${csvRow[PersonField.BIRTHDAY]}`,
    );
  } else {
    birthday = birthDate.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }
  return [birthday, birthDate];
}
