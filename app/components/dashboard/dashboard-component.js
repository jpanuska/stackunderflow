app.controller('DashboardController', function($rootScope, $scope){
<<<<<<< HEAD
	var dc = this;
	
	dc.editMember = function(member) {
		dc.setUsername(member.userName);
		// console.log(userName);
		// dc.setFirstName(firstName);
		// dc.setLastName(lastName);
		// dc.setImgUrl(imgUrl);
		// dc.setCountry(country);
		// dc.setBio(bio);
		// dc.setWebsiteUrl(websiteUrl);
		// dc.setGitHub(github);
		// dc.setTwitterHandle(twitterHandle);
		// dc.setFavorites(favoriteTags);
		
		$rootscope.member.$save(member);
	}
	
	dc.setUsername = function(userName) {
		if(username) {
			debugger
			$rootscope.member.userName = userName;
			console.log(userName);
		}
	}
	
=======
	
	var x = $rootScope.member;
	console.log(x);
>>>>>>> 1aa63dfd270d6add8f4a68809297f6e0e5a66ad5
	/**
	 * To edit the member object you must go through $rootScope.member
	 * $rootScope.member is a $firebaseObject from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject
	 * 
	 * Don't forget to call $rootScope.member.$save() after making changes to the $rootScope.member object
     * 
     * A feature request would be to add an edit profile button to the view that can show and hide the edit form in your html
	 * 
	 * */
	 
	 	// 	username: string,
		// firstName: string,
		// lastName: string,
		// imgUrl:  string,
		// country: string,
		// bio: string,
		// websiteUrl: string,
		// github: string,
		// twitterHandle: string,
		// favoriteTags: [tag], // <--- BONUS: use commas in the input field to add multiple tags. Or Look at multiselect inputs
		// **accountCreated: date,
		// **upVotes: number,
		// **downVotes: number,
		// **reputation: number,
		// **questions: [questionId]
		// **answers: [answerId],
		// **comments: [commentId]
		//Add anything else you think would be a cool feature to track
	
});