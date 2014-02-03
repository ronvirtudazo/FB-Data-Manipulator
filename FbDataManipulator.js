function FbDataManipulator(data){
	
	this.appID = data.appID;
	this.channelUrl = data.channelUrl;
	this.token = '';
	this.currentUser = '';
	
}
	
FacebookApp.prototype = {
  init: function() {
		FB.init({
			appId      : this.appID, // App ID
			channelUrl : '//'+this.channelUrl, // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
  },
  getLoginStatus: function(){
		
		FB.getLoginStatus(function(response) {
	  
		   console.log(response.status);
		   
		   if(response.status=="connected"){
				F.token = response.authResponse.accessToken;
				F.fetchProfile();
		   }
  
		});
	
  },
  isLike: function(obj){
	  
	  FB.api({
		method: 'fql.query',
		query:  "SELECT uid FROM page_fan WHERE uid = "+obj.uid+" AND page_id = "+obj.page_id
	  },
		function(response) {
			 
			if(jQuery.isEmptyObject(response)==true)
				return false;
			else
				return true;
			
		});
	  
  },
  
  fetchProfile: function(){
	  
	  FB.api('/me', function(response) {
		  	F.currentUser = response;
			console.log(F.currentUser);
		});
	  
  },
  eventSubscribe: function(){
		
		FB.Event.subscribe('auth.authResponseChange', function(response) {
  			
			if (response.status === 'connected') { 
				F.token = response.authResponse.accessToken;
				F.fetchProfile();
			} else if (response.status === 'not_authorized') { 
				console.log('Not authorized');
			} 
		
	  });
		
  }
  
} 