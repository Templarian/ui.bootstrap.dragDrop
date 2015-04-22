angular.module('demo', [
    'ui.bootstrap.dragDrop'
])

.factory('Note', function () {
    return function (title, text) {
        return {
            title: title || 'Title',
            text: text || 'Text'
        };
    };
})

.controller('DemoController', [
    '$scope', 'Note',
    function ($scope, Note) {

        $scope.workInProgressNotes = [];
        $scope.publishedNotes = [];
        $scope.note = null;

        $scope.addForm = {
            title: '',
            submit: function () {
                $scope.workInProgressNotes.push(new Note(this.title));
                this.title = '';
            }
        };

        $scope.$watchCollection('publishedNotes', function (newArray, oldArray) {
            if (newArray.length > oldArray.length) {
                angular.forEach($scope.workInProgressNotes, function (note, i) {
                    if (note === newArray[newArray.length - 1]) {
                        $scope.workInProgressNotes.splice(i, 1);
                    }
                });
            }
        });

        $scope.$watchCollection('workInProgressNotes', function (newArray, oldArray) {
            if (newArray.length > oldArray.length) {
                angular.forEach($scope.publishedNotes, function (note, i) {
                    if (note === newArray[newArray.length - 1]) {
                        $scope.publishedNotes.splice(i, 1);
                    }
                });
            }
        });

    }
]).run();