import fs from "fs";

export function replaceTextInFile(path, oldText, newText) {
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

export function modifyJsonFile(path, transformer) {
  fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const content = JSON.parse(data);
    const modifiedContent = transformer(content);

    fs.writeFileSync(
      path,
      JSON.stringify(modifiedContent, null, 2) + "\n",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      },
    );
  });
}
