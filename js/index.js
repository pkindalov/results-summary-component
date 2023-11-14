import { readData } from "./dataProcessor.js";

const init = () => {
  try {
    readData();
  } catch (e) {
    console.log(e.message);
  }
};

document.addEventListener("DOMContentLoaded", init);
document.removeEventListener("beforeunload", init);
