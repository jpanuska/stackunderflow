app.controller('QuestionsController', function($rootScope, $scope, DataService){
	/**
	 * $scope.tags and $scope.questions are $firebaseArrays from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * */
	$scope.tags = DataService.getTags();
	$scope.questions = DataService.getQuestions();

	
	$scope.addQuestion = function(newQuestion){
		
		newQuestion.posted = Date.now();
	    newQuestion.memberId = $rootScope.member.$id;
		newQuestion.tags = newQuestion.tag.split(" ");
		newQuestion.tag = null;
		debugger
	  	$scope.questions.$add(newQuestion).then(function(ref){
	  	//Add the newly added question to the member object	
	  	$rootScope.member.questions = $rootScope.member.questions || {};
	     //Another Dictonary structure all we are doing is adding the questionId to the member.questions dictionary.
	     //To avoid duplicating data in our database we only store the questionId instead of the entire question again 
	     $rootScope.member.questions[ref.key()] = ref.key();
	     $rootScope.member.$save();
		 $scope.newQuestion = null;
	  })
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
	 *  answeredOn: date, - > from ????
	 *  answered: bool,   -> from ???
	 *	tags: [tags] 	  -> scope
	 * } 
	 */

	
});

app.controller('QuestionController', function($rootScope, $scope, question, comments, responses){
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
	  	$scope.responses.$add(newResponse).then(function(ref){
			$rootScope.member.responses = $rootScope.member.responses || {};
			$rootScope.member.responses[ref.key()] = ref.key();
			$rootScope.member.$save();
			$scope.newResponse = null;
	   })
	  }
	  
	 $scope.deleteResponse = function (res){
		$scope.responses.$remove(res);	 
	 }

 

/*	 $scope.addResCom = function (newResCom, res){
		 newResCom.posted = Date.now();
		 newResCom.memberId = $rootScope.member.$id;
		 this.res = res;
		 debugger
		 res.comments.$add(newResCom).then(function(ref){
		 	$rootScope.member.res.comments = $rootScope.member.res.comments || {};
			$rootScope.member.res.comments[ref.key()] = ref.key();
			$rootScope.member.$save();
			$scope.newResponse = null;
	 })
	 } */

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
	
