# ui.bootstrap.dragdrop

Drag and Drop data and files with a few helpful AngularJS directives.

## Usage

Reference the dragDrop.js file.

```html
<script type="text/javascript" src="dragDrop.js"></script>
```

Add the `ui.bootstrap.dragDrop` module to your application's module.

```javascript
angular.module('demo', [
    'ui.bootstrap.dragDrop'
])
```

## Draggable / Droppable

These directives allow data to be bound to `draggable` elements and dropped into `droppable` container elements. The `drop-model` can be a single object or array of objects.

```html
<div draggable drag-model="item"></div>

<div droppable drop-model="items"></div>
```

## DragFile / DropFile

The `drag-file` and `drop-file` directives allow for quick drag and drop of files to and from the browser.
