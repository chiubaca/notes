---
title: All things vector tiles
publish_date: 2023-01-11
last_updated: 20230111
description: all my notes about vector tiles live here
status: draft
tags:
  - vector-tiles
  - gis
---

# Overview of vector tiles

vector tiles are instructions for how the client should render geometries making them very portable. The main tradeoff is complexity of creating and styling . The alternative were raster tiles which you render upfront and store but they were _much_ more difficult to manage and port around.

Vector tiles are instructions that can be in the following format:

- GeoJSON (human readable, widely used): `.json`
- TopoJSON (smaller than GeoJSON, shared line segments): `.topojson`
- Mapbox Vector Tiles (protocol buffer): `.mvt`

They will be very tiles that store geometries on file server usually in the standard `zoom`/`x`/`y` e.g `http://localhost/tiles/{layerName}/{z}/{x}/{y}.{format}?api_key={api_key}`


There are lots of js libs that can render vector tiles:
- [OpenLayers](http://openlayers.org/)
- [MapboxGL](https://www.mapbox.com/mapbox-gl/)

### Terminology

Tileset - A **tileset** is a collection of raster or vector data broken up into a uniform grid of square tiles at 22 preset [zoom levels](https://docs.mapbox.com/help/glossary/zoom-level/). tilesets can be either raster or vectors


[Vector tilesets](https://docs.mapbox.com/help/glossary/tileset/#vector-tilesets) - a.k.a vector tiles are used as basemaps.

MBTiles - a file format for storing [tilesets](https://docs.mapbox.com/help/glossary/tileset/). It's designed to allow you to package up many files into a single tileset.  MBTiles is an open specification based on the [SQLite](https://sqlite.org/) database. MBTiles can contain raster or vector [tilesets](https://docs.mapbox.com/help/glossary/tileset/).



## Workflow A

- geojson to mbtiles via [tippicanoe]([felt/tippecanoe: Build vector tilesets from large collections of GeoJSON features. (github.com)](https://github.com/felt/tippecanoe))
- tippicanoe to mvt files


## 3d Assets in vector tiles? 

One way of acheiveing 3d effects in vector tiles is to enbed height attribute to each geometry. Then as part of the front end rendering logic you can extrude based on this value. Example - [Display buildings in 3D | Mapbox GL JS | Mapbox](https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/)

 

## Creating terrains raster basemaps?
- [joerd/docs/formats.md at master · tilezen/joerd (github.com)](https://github.com/tilezen/joerd/blob/master/docs/formats.md)







Fleeting notes about vector tiles

[2023-08-20](fleeting-notes/2023-08-20.md)
[2023-09-18](fleeting-notes/2023-09-18.md)
[2023-10-10](fleeting-notes/2023-10-10.md)

References
 - [Build Your Own Static Vector Tile Pipeline - Geovation Tech Blog](https://geovation.github.io/build-your-own-static-vector-tile-pipeline)

