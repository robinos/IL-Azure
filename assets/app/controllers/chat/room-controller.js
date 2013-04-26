(function( ng, app ){

	"use strict";

	app.controller(
		"chat.RoomController",
		function ($scope, requestContext, roomService, _)
		{
			// --- Define Controller Methods. ------------------- //

			// I apply the remote data to the local view model.
		    function applyRemoteData(rooms)
		    {
				$scope.rooms = _.sortOnProperty( rooms, "name", "asc" );
			}

			// Loads the "remote" data from the server.
			function loadRemoteData()
			{
				$scope.isLoading = true;
				var promise = roomService.getRooms();

				promise.then(
					function( response ) {
						$scope.isLoading = false;
						applyRemoteData( response );
					},
					function( response ) {
						$scope.openModalWindow( "error", "Av någon anledning kunde rumlistan inte laddas. Försök ladda om sidan." );
					}
				);
			}

			// --- Define Scope Methods. ------------------------ //

			// ...

			// --- Define Controller Variables. ----------------- //

			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.chat.rooms" );
			
			// --- Define Scope Variables. ---------------------- //

			// The isLoading flag for the data is being loaded.
			$scope.isLoading = true;

			// The rooms variable holds the rooms to render.
			$scope.rooms = [];

			// The subview indicates which view is going to be rendered on the page.
			$scope.subview = renderContext.getNextSection();
			
			// --- Bind To Scope Events. ------------------------ //

			// Handler for changes to the request context.
			$scope.$on(
				"requestContextChanged",
				function() {
					// Make sure this change is relevant to this controller.
					if ( ! renderContext.isChangeRelevant() ) {
						return;
					}

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();
				}
			);

			// --- Initialize. ---------------------------------- //

			// Set the window title.
			$scope.setWindowTitle( "Chatt" );

			// Load the "remote" data.
			loadRemoteData();
		}
	);

})(angular, Intlec);