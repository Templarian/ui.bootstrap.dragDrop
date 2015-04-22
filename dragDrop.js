angular.module('ui.bootstrap.dragDrop', [])

.service('DragDropService', [
    '$cacheFactory',
    function ($cacheFactory) {

        var cache = $cacheFactory('dragdrop');

        this.get = function (key) {
            /// <summary>Get key's value</summary>
            /// <param name="key" type="String">GUID</param>
            /// <returns type="*">Stored value</returns>
            return cache.get(key);
        };

        this.put = function (key, value) {
            /// <summary>Store key's value</summary>
            /// <param name="key" type="String">GUID</param>
            /// <param name="value" type="*">Stored value</param>
            cache.put(key, value);
        };

        this.remove = function (key) {
            /// <summary>Remove the key's cache</summary>
            /// <param name="key" type="String">GUID</param>
            cache.remove(key);
        };

        this.guid = function () {
            /// <summary>Generate GUID.</summary>
            /// <returns type="String">GUID</returns>
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        };

    }
])

.directive('draggable', [
    'DragDropService',
    function (DragDropService) {
        return function (scope, element, attrs) {
            var el = element[0];
            el.id = DragDropService.guid();
            el.draggable = true;

            scope.$watch(attrs.dragModel, function (value) {
                DragDropService.put(el.id, value);
            });

            el.addEventListener('dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag-active');
                return false;
            }, false);

            el.addEventListener('dragend', function (e) {
                this.classList.remove('drag-active');
                return false;
            }, false);
        }
    }
])

.directive('droppable', [
    'DragDropService',
    function (DragDropService) {
        return {
            scope: {
                drop: '&',
                dropModel: '='
            },
            link: function (scope, element, attrs) {

                var el = element[0];

                el.addEventListener('dragover', function (e) {
                    e.dataTransfer.dropEffect = 'move';
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('drag-over');
                    return false;
                }, false);

                el.addEventListener('dragenter',
                  function (e) {
                      this.classList.add('drag-over');
                      return false;
                  }, false);

                el.addEventListener('dragleave', function (e) {
                    this.classList.remove('drag-over');
                    return false;
                }, false);

                el.addEventListener('drop', function (e) {

                    if (e.stopPropagation) e.stopPropagation();

                    this.classList.remove('drag-over');

                    var id = e.dataTransfer.getData('Text');

                    var value = DragDropService.get(id);
                    if (typeof scope.dropModel !== 'undefined') {
                        if (scope.dropModel instanceof Array) {
                            if (scope.dropModel.indexOf(value) > -1) {
                                return false;
                            }
                            scope.dropModel.push(value);
                        } else {
                            if (scope.dropModel === value) {
                                return false;
                            }
                            scope.dropModel = value;
                        }
                        scope.$apply();
                    } else {
                        throw 'Missing dropModel';
                    }

                    return false;
                }, false);

            }
        }
    }
])

.directive('dropFile', [
    'DragDropService',
    function (DragDropService) {

    }
])
.directive('dragFile', [
    'DragDropService',
    function (DragDropService) {

    }
]);