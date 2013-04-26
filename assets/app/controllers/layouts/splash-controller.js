(function (ng, app) {

	"use strict";

	app.controller(
		"layouts.SplashController",
		function ($scope, requestContext, _)
		{
		    //--- Define Controller Methods. ------------------- //
		    //On initial load, start authorisation
		    function refreshAuthDisplay() {
		        var isLoggedIn = client.currentUser !== null;
		        $("#logged-in").toggle(isLoggedIn);
		        $("#logged-out").toggle(!isLoggedIn);

		        if (isLoggedIn) {
		            $("#login-name").text(client.currentUser.userId);
		            //refreshMessageItems();
		            $('#summary').html('Du är nu inloggad.');
		        }
		        else {
		            $('#summary').html('<strong>Du måste logga in för att få tillgång till chatt.</strong>');
		        }
		    }

		    function logIn() {
		        client.login("microsoftaccount").then(refreshAuthDisplay, function (error) {
		            alert(error);
		        });
		    }

		    function logOut() {
		        client.logout();
		        refreshAuthDisplay();
		        $('#summary').html('<strong>Du måste logga in för att få tillgång till chatt.</strong>');
		    }

		    // On page init, fetch the data and set up event handlers
		    $(function () {
		        refreshAuthDisplay();
		        $("#logged-out button").click(logIn);
		        $("#logged-in button").click(logOut);
		    });

		    // --- Define Scope Methods. ------------------------ //

			// --- Define Controller Variables. ----------------- //

			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "splash" );
			
			// --- Define Scope Variables. ---------------------- //

			// The subview indicates which view is going to be rendered on the page.
			$scope.subview = renderContext.getNextSection();

			// --- Bind To Scope Events. ------------------------ //

			// I handle changes to the request context.
			$scope.$on(
				"requestContextChanged",
				function ()
				{
					// Make sure this change is relevant to this controller.
					if ( ! renderContext.isChangeRelevant() ) {
						return;
					}

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();
				}
			);

			// --- Initialize. ---------------------------------- //
		}
	);
})(angular, Intlec);