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

### Basic Example

This example shows how having a simple object can be dragged into a collection. The cube's reference is added to the collection, so it is in two places. It can only be dragged once since the collection needs unique object references.

```javascript
.controller('ExampleController', function ($scope) {
    $scope.cube = { name: 'cube' };
    $scope.shapes = [];
});
```

```html
<div class="item" draggable drag-model="cube"></div>
<div class="drop-area" droppable drop-model="items">
    <div ng-repeat="shape in shapes" ng-bind="shape.name"></div>
</div>
<style>
.item { width: 100px; height: 100px; background: red; }
.drag-area { width: 300px; height: 120px; background: #EEE; }
.drag-area.drag-over { background: green; }
</style>
```

## DragFile / DropFile

The `drag-file` and `drop-file` directives allow for quick drag and drop of files to and from the browser.
