//  - DRAG DE LAS IMAGENES - 

 gsap.registerPlugin(Draggable);

  Draggable.create(".draggable", {
    bounds: ".drag-area",
    inertia: true
  });

  gsap.registerPlugin(Draggable);

Draggable.create(".draggable", {
  bounds: ".drag-area",
  inertia: true,
  dragClickables: true,
  allowEventDefault: true
});

