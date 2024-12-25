import fs from "fs";

export function modifyFile(path, oldText, newText) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const modifiedData = data.replace(oldText, newText);

    fs.writeFile(path, modifiedData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}
