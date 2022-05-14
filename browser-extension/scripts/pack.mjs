import Zip from "adm-zip";

function createChromeExt() {
  const zip = new Zip();

  zip.addLocalFile("manifest.json");
  zip.addLocalFolder("assets", "assets");
  zip.addLocalFolder("dist", "dist");

  zip.writeZip("extension-chrome.zip");
}
function createFirefoxExt() {
  const zip = new Zip();

  zip.addLocalFile("manifest.v2.json", undefined, "manifest.json");
  zip.addLocalFolder("assets", "assets");
  zip.addLocalFolder("dist", "dist");

  zip.writeZip("extension-firefox.zip");
}

function createChromeSource() {
  const zip = new Zip();

  zip.addLocalFile("manifest.json");
  zip.addLocalFile("package.json");
  zip.addLocalFile("README.md");
  zip.addLocalFolder("assets", "assets");
  zip.addLocalFolder("src", "src");

  zip.writeZip("source-chrome.zip");
}

function createFirefoxSource() {
  const zip = new Zip();

  zip.addLocalFile("manifest.v2.json", undefined, "manifest.json");
  zip.addLocalFile("package.json");
  zip.addLocalFile("README.md");
  zip.addLocalFolder("assets", "assets");
  zip.addLocalFolder("src", "src");

  zip.writeZip("source-firefox.zip");
}

createChromeExt();
createFirefoxExt();

createChromeSource();
createFirefoxSource();
