```bash
gdal_translate -co TILED=TRUE -co COMPRESS=LZW -co BIGTIFF=YES -expand RGB georeferencer-export.tif converted.tif

rio calc "(asarray (take a 1) (take a 2) (take a 3))" --co compress=lzw --co tiled=true --co blockxsize=256 --co blockysize=256 --name a=converted.tif result.tif
rio edit-info --nodata 0 result.tif
```