app.controller('QuestionsController', function($rootScope, $scope, DataService){
	/**
	 * $scope.tags and $scope.questions are $firebaseArrays from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * */
	$scope.tags = DataService.getTags();
	$scope.questions = DataService.getQuestions();

	
	$scope.addQuestion = function(newQuestion){
		debugger
		newQuestion.posted = Date.now();
	    newQuestion.memberId = $rootScope.member.$id;
		newQuestion.username = $rootScope.member.username;
		newQuestion.tags = newQuestion.tag.replace(/,/g, ' ').split(" ");
		newQuestion.tag = null;
		newQuestion.answeredOn = '';
		newQuestion.answered = false;
		newQuestion.votes = {};
		newQuestion.rating = 0;
	  	$scope.questions.$add(newQuestion).then(function(ref){
	  	$rootScope.member.questions = $rootScope.member.questions || {};
	     //Another Dictonary structure all we are doing is adding the questionId to the member.questions dictionary.
	     //To avoid duplicating data in our database we only store the questionId instead of the entire question again 
	     $rootScope.member.questions[ref.key()] = ref.key();
	     $rootScope.member.$save();
		 $scope.newQuestion = null;
	  })
	 }

	 
	 
	 $scope.getlength = function(q){
		 q.responses ? q.responseCount = Object.keys(q.responses).length : q.responseCount = 0;
		 q.comments  ? q.commentCount  = Object.keys(q.comments).length : q.commentCount = 0;
	 }
	 
	 
	 $scope.deleteQuestion = function (question){
		 $scope.questions.$remove(question);
	 }
	 
	 
	  /*
	 * question Schema
	 * {
	 *  title: string,  - > from form
	 *  body: string,	- > from form
	 *  votes: {memberId: number}, -> ??
	 *  author: string,	- > from scope
	 *  posted: date,	- > from function
	 *  answeredOn: date, - > from questin
	 *  answered: bool,   -> from question
	 *	tags: [tags] 	  -> scope
	 * } 
	 */

	
});

app.controller('QuestionController', function($rootScope, $scope, question, comments, responses, $firebaseArray){
	/**
	 * The question, comments, responses arguments being passed into the controller  ^^^^^^^
	 * come from the question route resolve,
	 * Remember that ui-router ensures that the resolve functions finish before loading up the controller
	 *  
	 * $scope.question is $firebaseObject from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject
	 * 
	 * $scope.comments and $scope.responses are $firebaseArrays
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * 
	 * hint: managing votes can be tricky! Actually very tricky! One of the best ways to 
	 * ensure a member can only vote once is to use a dictonary or an object as question.votes 
	 * 
	 * think of it this way 
	 * 
	 * $scope.question.votes[$rootScope.member.$id] = 1 || -1
	 * 
	 * This logic here should help keep your voteCount on track
	 * $scope.question.voteCount = 0;
	 * for(var key in $scope.question.votes){
	 * 	$scope.question.voteCount += $scope.question.votes[key];
	 * }
	 * 
	 * Don't forget to call $scope.question.$save() after updating the question properties
	 * Also anytime you update $rootScope.member don't forget $rootScope.member.$save() to write it to the db
	 * */
	$scope.question = question;
	$scope.comments = comments;
	$scope.responses = responses;

	
	
	 $scope.addComment = function(newComment){
		newComment.posted = Date.now();
	  	newComment.memberId = $rootScope.member.$id;
		newComment.username = $rootScope.member.username;
	  	$scope.comments.$add(newComment).then(function(ref){	
	  	  	$rootScope.member.comments = $rootScope.member.comments || {};
			$rootScope.member.comments[ref.key()] = ref.key();
			$rootScope.member.$save();
			$scope.newComment = null;
	   })
	  }
	  
	  $scope.deleteComment = function (com){
		 $scope.comments.$remove(com);
	 }
	  
	 $scope.addResponse = function(newResponse){
		newResponse.posted = Date.now();
	  	newResponse.memberId = $rootScope.member.$id;
		newResponse.username = $rootScope.member.username;
		question.answered = true;
		question.answeredOn = Date.now();
		question.$save();
		debugger
	  	$scope.responses.$add(newResponse).then(function(ref){
			$rootScope.member.responses = $rootScope.member.responses || {};
			$rootScope.member.responses[ref.key()] = ref.key();
			$rootScope.member.$save();
			$rootScope.member.$save();
			$scope.newResponse = null;
	   })
	  }
	  
	 $scope.deleteResponse = function (res){
		$scope.responses.$remove(res);	 
	 }

 
	 $scope.addRescom = function (newCommentToResponse, res){
		 
		 newCommentToResponse.posted = Date.now();
		 newCommentToResponse.memberId = $rootScope.member.$id;
		 newCommentToResponse.username = $rootScope.member.username;
		 var responseCommentsRef = question.$ref().child('responses').child(res.$id).child('comments');
		 var responsesComments = $firebaseArray(responseCommentsRef);
		 debugger
		 responsesComments.$add(newCommentToResponse).then(function(ref){
		 	$rootScope.member.comments = $rootScope.member.comments || {};
			$rootScope.member.comments[ref.key()] = ref.key();
			newCommentToResponse.id = ref.key()
			ref.update(newCommentToResponse)
			$rootScope.member.$save();
			$scope.newCommentToResponse = null;
	 	})
	 	
	 	}
		 
	$scope.deleteRescom = function (rescom, res){
		question.$ref().child('responses').child(res.$id).child('comments').child(rescom.id).remove()
	}
	
	$scope.questionRate = function (smth){
		debugger
		question.rating =0
		question.votes = question.votes || {};
		question.votes[$rootScope.member.$id] = smth;
		for (var id  in question.votes){
			question.rating += question.votes[id];
		}
		
		question.$save();
		$rootScope.member.$save();
	}

});	
	 

	 /* question Schema
	 * {
	 *  title: string,
	 *  body: string,
	 *  votes: {memberId: number},
	 *  author: string,
	 *  posted: date,
	 *  answeredOn: date,
	 *  answered: bool, 
	 *	tags: [tags] 
	 * } 
	 */
	
