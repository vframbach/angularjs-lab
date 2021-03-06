var app = angular.module('angularjsApp', ['ngRoute', 'templates', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            })
            .when('/question/:id', {
                templateUrl: 'question.html',
                controller: 'QuestionCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

app.factory("Question", ["$resource", function($resource) {
    return $resource('/api/questions/:id', {
        id: '@id'
    }, {
        "update": {
            method: "PUT"
        }
    });
}]);

app.factory("Answer", ["$resource", function($resource) {
    return $resource('/api/questions/:question_id/answers/:id', {
        question_id: '@question_id',
        id: '@id'
    }, {
        "update": {
            method: "PUT"
        }
    });
}]);

app.controller('HomeCtrl', ['$scope', 'Question', function($scope, Question) {
    $scope.homeTest = "Welcome to the homepage!";
    $scope.allQuestions = Question.query();
    $scope.newQuestion = new Question();
    $scope.addQuestion = function() {
        console.log('button is clicked');
        $scope.newQuestion.$save(function(data) {
        	$scope.allQuestions = Question.query();
            console.log("success!");
        }, function(error) {
            console.log("error!");
        });
    };
    $scope.editQuestion = function(question) {
        console.log("edit button clicked!", question);
        question.editting = true;
    };
    $scope.updateQuestion = function(question) {
        console.log("question updated!", question);
        question.$update(function(data) {
            console.log("success!");
        }, function(error) {
            console.log("error!");
        });
    };
    $scope.deleteQuestion = function(question) {
        console.log("delete button clicked!", question);
        question.$delete(function(data) {
            console.log("success!");
        }, function(error) {
            console.log("error!");
        });
    };
}]);

app.controller('QuestionCtrl', ['$scope', '$routeParams', 'Question', 'Answer', function($scope, $routeParams, Question, Answer) {
    var questionId = $routeParams.id;
    $scope.question = Question.get({
        id: questionId
    });
    $scope.allAnswers = Answer.query({
        question_id: questionId
    });
    $scope.newAnswer = new Answer({
        question_id: questionId
    });
    $scope.addAnswer = function() {
        console.log('button is clicked');
        $scope.newAnswer.$save(function(data) {
        	$scope.allAnswers = Answer.query({
		        question_id: questionId
		    });
            console.log("success!");
        }, function(error) {
            console.log("error!");
        });
    };
    $scope.editAnswer = function(answer) {
        console.log("edit button clicked!", answer);
        answer.editting = true;
    };
    $scope.updateAnswer = function(answer) {
        console.log("answer updated!", answer);
        answer.$update(function(data) {
            console.log("success!");
        }, function(error) {
            console.log("error!");
        });
    };
    $scope.deleteAnswer = function(answer) {
        console.log("delete button clicked!", answer);
        answer.$delete(function(data) {
            console.log("success!");
        }, function(error) {
            console.log("error!");
        });
    };
}]);