//Azure variables
var client = new WindowsAzure.MobileServiceClient('https://interactivelecture.azure-mobile.net/', 'hODmTfJKYkxAuxrlYUwRLgLevxBQUg19');
    //messageItemTable = client.getTable('messages');

//var messages = [];
//var realtimeStatus = "Connecting...";
//var channel = "pubnub_chat";
//var limit = 20;

//Pusher variables
//var pusher = new Pusher('057358e5f63b150193fe'),
//channel = pusher.subscribe('test_channel');

// Create an application module.
var Intlec = angular.module("Intlec", []).directive('coolFade', function () {
    return {
        compile: function (elm) {
            //console.log('compiling');
            $(elm).css('opacity', 0);
            return function (scope, elm, attrs) {
                // console.log('animating');
                $(elm).animate({ opacity: 1.0 }, 1000);
            };
        }
    };
});

// Configure the routing. The $routeProvider will be automatically injected into 
// the configurator.
Intlec.config(
	function( $routeProvider ){

		// Typically, when defining routes, you will map the route to a Template to be 
		// rendered; however, this only makes sense for simple web sites. When you are 
		// building more complex applications, with nested navigation, you probably need 
		// something more complex. In this case, we are mapping routes to render "Actions" 
		// rather than a template.
		$routeProvider
			.when(
				"/home",
				{
					action: "splash.home"
				}
			)
			.when(
				"/chat",
				{
					action: "standard.chat.rooms"
				}
			)
			.when(
				"/chat/:roomID",
				{
					action: "standard.chat.chatlist"
				}
			)
			.when(
				"/chat/:roomID/:chatID",
				{
					action: "standard.chat.detail.background"
				}
			)
			.when(
				"/chat/:roomID/:chatID/diet",
				{
					action: "standard.chat.detail.diet"
				}
			)
			.when(
				"/chat/:roomID/:chatID/medical-history",
				{
					action: "standard.chat.detail.medicalHistory"
				}
			)
			.when(
				"/quiz",
				{
					action: "standard.quiz"
				}
			)
			.otherwise(
				{
					redirectTo: "/home"
				}
			)
		;

	}
);
