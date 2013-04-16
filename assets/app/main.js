//Azure variables
var client = new WindowsAzure.MobileServiceClient('https://interactivelecture.azure-mobile.net/', 'hODmTfJKYkxAuxrlYUwRLgLevxBQUg19');

// Create an application module.
var Intlec = angular.module("Intlec", []);

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
					action: "standard.chat.categories"
				}
			)
			.when(
				"/chat/:categoryID",
				{
					action: "standard.chat.list"
				}
			)
			.when(
				"/chat/:categoryID/:chatID",
				{
					action: "standard.chat.detail.background"
				}
			)
			.when(
				"/chat/:categoryID/:chatID/diet",
				{
					action: "standard.chat.detail.diet"
				}
			)
			.when(
				"/chat/:categoryID/:chatID/medical-history",
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
