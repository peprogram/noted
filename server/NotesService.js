const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const dated = new Date();

class NotesService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async addEntry(title, message, dated) {
    const data = await this.getData();
    if (title === "") title = "Untitled ";
    data.unshift({ title, message, dated });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  async getList() {
    const data = await this.getData();
    return data;
  }

  async getData() {
    const data = await readFile(this.datafile, "utf-8");
    return JSON.parse(data);
  }
}

module.exports = NotesService;
