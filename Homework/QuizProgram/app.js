 angular.module("QuizApplication",[])

.controller("QuizController", ['$scope', 'LocalStorageService', '$http',
        function($scope, LocalStorageService, $http){
            var qc = this;
            
            $http.get("questions.json").then(function (response) {
                qc.students = response.data.students;
            });
            
            $http.get("questions.json").then(function (response) {
            qc.questions = response.data.questions;
            });
			
			
            qc.students = 
            [
                {
                    Name : "Jack Nicholes",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 0
                },
                {
                    Name : "Jimmy Johns",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 1
                },
                {
                    Name : "Reavers",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 2
                },
                {
                    Name : "Great Oz",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 3
                },
                {
                    Name : "Morrigan Freeman",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 4
                },
                {
                    Name : "Great Gatsby",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 5
                },
                {
                    Name : "Nova Ghost",
                    Correct : 0,
                    Incorrect : 0,
                    Index : 6
                }
            ]; 

            
            qc.students_completed = [];
            
            qc.studentList = [];

            qc.questions = 
            [
                {
                    Question : "How do you share data between controllers?",
                    Answer : "Create an AngularJS service that will hold the data and inject it inside of the controllers."
                },
                {
                    Question : "Where should we implement the DOM manipulation in AngularJS?",
                    Answer : "In the directives."
                },
                {
                    Question : "Is it a good or bad practice to use AngularJS together with jQuery?",
                    Answer : "It is definitely a bad practice."
                },
                {
                    Question : "What is an interceptor?",
                    Answer : "An interceptor is a middleware code where all the $http requests go through."
                },
                {
                    Question : "How do you hide an HTML element via a button click in AngularJS?",
                    Answer : "You can do this by using the ng-hide directive in conjunction with a controller we can hide an HTML element on button click."
                }
            ];
            
            qc.questions_completed = [];
            
            qc.getNextQuestion = function(){
        
        if(qc.questions.length > 0){
            var index = Math.floor(Math.random() * qc.questions.length);
            
            qc.selected_question = qc.questions[index];
            
            qc.questions_completed.push(qc.selected_question);
            
            qc.questions.splice(index, 1);            
        }
        else{
            qc.questions = qc.questions_completed;
            qc.questions_completed = [];
        }

    };
    
    qc.getNextStudent = function(){
        
        if(qc.students.length > 0){
            var index = Math.floor(Math.random() * qc.students.length);
             
            qc.selected_student = qc.students[index];
             
            qc.students_completed.push(qc.selected_student);
             
            qc.students.splice(index, 1);
       }
        else{
            qc.students = qc.students_completed;
            qc.students_completed = [];
        }
    
    };
    
 
    qc.getNext = function(){
        qc.getNextQuestion();
        qc.getNextStudent();
    };

    
    qc.doCorrect = function(student){
        student.Correct++;
        qc.getNext();
    };
    

    
    qc.doIncorrect = function(student){
        student.Incorrect++;
        qc.getNext(); 
    };
    
    qc.getNext();
	   
	qc.latestData = function() {
        return LocalStorageService.getData('quiz-storage');
    };
	    
}])

.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'quiz-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});