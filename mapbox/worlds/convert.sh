#!/bin/sh

BASEDIR=$(dirname $0)

convert() {
    FOLDER=$BASEDIR/$1

    gdal_translate -co TILED=TRUE -co COMPRESS=LZW -co BIGTIFF=YES -expand RGB $FOLDER/georeferenced.tif $FOLDER/converted.tif

    rio calc "(asarray (take a 1) (take a 2) (take a 3))" --co compress=lzw --co tiled=true --co blockxsize=256 --co blockysize=256 --name a=$FOLDER/converted.tif --overwrite $FOLDER/result.tif
    rio edit-info --nodata 0 $FOLDER/result.tif
}

convert crit-city
convert watopia