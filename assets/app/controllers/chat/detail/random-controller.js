(function( ng, app ){

	"use strict";

	app.controller(
		"chat.detail.RandomController",
		function( $scope, requestContext, chatService, _ ) {


			// --- Define Controller Methods. ------------------- //


			// I apply the remote data to the local view model.
		    function applyRemoteData(chat) {

			    $scope.chat = chat;

			}


			// I load the "remote" data from the server.
			function loadRemoteData() {

				$scope.isLoading = true;

				var promise = chatService.getRandomChatExcluding($scope.categoryID, $scope.chatID);

				promise.then(
					function( response ) {

						$scope.isLoading = false;

						applyRemoteData( response );

					},
					function( response ) {

					    $scope.openModalWindow("error", "For some reason we couldn't load a random chat. Try refreshing your browser.");

					}
				);

			}


			// --- Define Scope Methods. ------------------------ //


			// ...


			// --- Define Controller Variables. ----------------- //


			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext("standard.chat.detail", ["categoryID", "chatID"]);

			
			// --- Define Scope Variables. ---------------------- //


			// Get the relevant route IDs.
			$scope.categoryID = requestContext.getParam( "categoryID" );
			$scope.chatID = requestContext.getParamAsInt("chatID");

			// I flag that data is being loaded.
			$scope.isLoading = true;

			// I hold the pet to render.
			$scope.chat = null;


			// --- Bind To Scope Events. ------------------------ //


			// I handle changes to the request context.
			$scope.$on(
				"requestContextChanged",
				function() {

					// Make sure this change is relevant to this controller.
					if ( ! renderContext.isChangeRelevant() ) {

						return;

					}

					// Get the relevant route IDs.
					$scope.categoryID = requestContext.getParam( "categoryID" );
					$scope.chatID = requestContext.getParamAsInt("chatID");

					// If the relevant ID has changed, refresh the view.
					if (requestContext.haveParamsChanged(["categoryID", "chatID"])) {

						loadRemoteData();

					}

				}
			);


			// --- Initialize. ---------------------------------- //


			// Load the "remote" data.
			loadRemoteData();


		}
	);

})(angular, Intlec);