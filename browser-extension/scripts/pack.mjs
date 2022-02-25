import Zip from "adm-zip";

const zip = new Zip();

zip.addLocalFile("manifest.json");
zip.addLocalFolder("assets", "assets");
zip.addLocalFolder("dist", "dist");

zip.writeZip("extension.zip");
