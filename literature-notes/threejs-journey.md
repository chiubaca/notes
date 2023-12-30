---
title: threejs-journey
publish_date: 2021-09-28
last_updated: 20210930
description: Notes from threejs-journey.xyz
tags:
  - threejs
  - 3d
  - webgl
---

# Notes from threejs-journey.xyz

## Basics

In three.js there are there basic core building blocks

A scene which will house all the 3D objects and cameras.

```js
const scene = new THREE.Scene();
```

A camera which displays the 3D objects in any sort of angle required.

```js
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
```

A 3D object, also known as a `mesh`. A `mesh` is comprised of some geometry and a texture.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ map: colorTexture });

const mesh = new THREE.Mesh(geometry, material);
```

The camera and 3D objects need to be added to the `scene`.

```js
scene.add(mesh);
scene.add(camera);
```

Things get a lot more interesting when we bring controls and animations into the mix. But this is the core of how three.js works.

### Cameras

[2021-08-28](fleeting-notes/2021-08-28.md)
[2021-08-30](fleeting-notes/2021-08-30.md)
[2021-09-05](fleeting-notes/2021-09-05.md)
[2021-09-09](fleeting-notes/2021-09-09.md)

### Textures / Meshes

[2021-09-12](fleeting-notes/2021-09-12.md)
[2021-09-30](fleeting-notes/2021-09-30.md)

### Animations

[2021-08-29](fleeting-notes/2021-08-29.md)

### Text

[2021-10-02](fleeting-notes/2021-10-02.md)
### Lighting & Shadows

[2021-10-10](fleeting-notes/2021-10-10.md)
[2021-10-12](fleeting-notes/2021-10-12.md)

### Raycasting

[2021-11-08](fleeting-notes/2021-11-08.md)

### Importing 3D models

[2022-11-18](fleeting-notes/2022-11-18.md)
### Debugging

[2021-09-11](fleeting-notes/2021-09-11.md)

## References

- https://threejs-journey.xyz/
