app.controller('DashboardController', function($rootScope, $scope){
	var dc = this;

	dc.editMember = function(member) {
		dc.setUsername(member.username);
		dc.setFirstName(member.firstName);
		dc.setLastName(member.lastName);
		dc.setImgUrl(member.imgUrl);
		dc.setCountry(member.country);
		dc.setBio(member.bio);
		dc.setWebsiteUrl(member.websiteUrl);
		dc.setGitHub(member.github);
		dc.setTwitterHandle(member.twitterHandle);
		dc.setFavorites(member.favoriteTags);
		
		console.log($rootScope.member);
		
		$rootScope.member.$save();
	}
	
	dc.setUsername = function(username) {
		if(username) {
			$rootScope.member.username = username;
		}
	}
	
	dc.setFirstName = function(firstName) {
		if(firstName) {
			$rootScope.member.firstName = firstName;
		}
	}
	
	dc.setLastName = function(lastName) {
		if(lastName) {
			$rootScope.member.lastName = lastName;
		}
	}
	
	dc.setImgUrl = function(imgUrl) {
		if(imgUrl) {
			$rootScope.member.imgUrl = imgUrl;
		}
	}
	
	dc.setCountry = function(country) {
		if(country) {
			$rootScope.member.country = country;
		}
	}
	
	dc.setBio = function(bio) {
		if(bio) {
			$rootScope.member.bio = bio;
		}
	}
	
	dc.setWebsiteUrl = function(websiteUrl) {
		if(websiteUrl) {
			$rootScope.member.websiteUrl = websiteUrl;
		}
	}
	
	dc.setGitHub = function(github) {
		if(github) {
			$rootScope.member.github = github;
		}
	}
	
	dc.setTwitterHandle = function(twitterHandle) {
		if(twitterHandle) {
			$rootScope.member.twitterHandle = twitterHandle;
		}
	}
	
	dc.setFavorites = function(favoriteTags) {
		if(favoriteTags) {
			arr = favoriteTags.split(",");
			for (i = 0; i < arr.length; i++) {
				current = arr[i];
				current.trim();
			}
			
			$rootScope.member.favoriteTags = arr;
		}
	}
	
	dc.questions = function findQuestions(){
		
	};
	dc.answers = function findAnswers(){
		
	};
	dc.comments = function findComments() {
		
	};

	

    //   A feature request would be to add an edit profile button to the view that can show and hide the edit form in your html
	
});