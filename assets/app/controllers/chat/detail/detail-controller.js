//This is a placeholder file for future message handling.  It is not used.
(function( ng, app ){

	"use strict";

	app.controller(
		"chat.detail.DetailController",
		function( $scope, $location, $q, requestContext, roomService, chatService, _ ) {

			// --- Define Controller Methods. ------------------- //

			// I apply the remote data to the local view model.
		    function applyRemoteData(room, chat)
		    {
				$scope.room = room;
				$scope.chat = chat;

				$scope.setWindowTitle( chat.name + " - " + chat.breed );
			}

			// Loads the "remote" data from the server.
		    function loadRemoteData()
		    {
				$scope.isLoading = true;

				var promise = $q.all(
					[
						roomService.getRoomByID( $scope.roomID ),
						chatService.getChatByID( $scope.chatID )
					]
				);

				promise.then(
					function (response)
					{

						$scope.isLoading = false;

						applyRemoteData( response[ 0 ], response[ 1 ] );
					},
					function (response)
					{
						// The chat couldn't be loaded for some reason - possibly someone hacking with the URL. 
						$location.path( "/chat/" + $scope.roomID );
					}
				);
			}

			// --- Define Scope Methods. ------------------------ //

			// ...

			// --- Define Controller Variables. ----------------- //

			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.chat.detail", "chatID" );
			
			// --- Define Scope Variables. ---------------------- //

			// Get the relevant route IDs.
			$scope.roomID = requestContext.getParam( "roomID" );
			$scope.chatID = requestContext.getParamAsInt("chatID");

			// I flag that data is being loaded.
			$scope.isLoading = true;

			// I hold the category and pet to render.
			$scope.room = null;
			$scope.chat = null;

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

					// Get the relevant route IDs.
					$scope.roomID = requestContext.getParam( "roomID" );
					$scope.chatID = requestContext.getParamAsInt( "chatID" );

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

					// If the relevant ID has changed, refresh the view.
					if ( requestContext.haveParamsChanged( [ "roomID", "chatID" ] ) ) {
						loadRemoteData();
					}
				}
			);

			// --- Initialize. ---------------------------------- //

			// Set the window title.
			$scope.setWindowTitle( "Loading Message" );

			// Load the "remote" data.
			loadRemoteData();
		}
	);
})(angular, Intlec);