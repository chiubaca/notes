---
title: The Anatomy of A Three.js Scene
publish_date: 20211003
last_updated: 20211003
description: The basics of how a three.js scene works
status: draft
layout: ../../layouts/PermanentNoteLayout.astro
---

In three.js there are there basic core building blocks

A scene which will house all the 3D objects and cameras.
```js
const scene = new THREE.Scene()
```

A camera which displays the 3D objects in any sort of angle required.
```js
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
```

A 3D object, also known as a `mesh`. A `mesh` is comprised of some geometry and a texture.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ map: colorTexture });

const mesh = new THREE.Mesh(geometry, material);
```


The camera and 3D objects need to be added to the `scene`.

```js
scene.add(mesh)
scene.add(camera);
```

Things get a lot more interesting when we bring controls and animations into the mix. But this is the core of how three.js works.
