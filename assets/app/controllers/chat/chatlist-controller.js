(function (ng, app) {

	"use strict";

	app.controller(
		"chat.ChatListController",
		function( $scope, $location, $q, requestContext, roomService, chatService, _ ) {
		    // --- Define Controller Variables. ----------------- //

		    $scope.messages = [];
		    $scope.realtimeStatus = "Ansluter...";
		    $scope.channel = "pubnub_chat"; //default
		    $scope.limit = 20;

		    //publish a chat message
		    //function publish(){
		    $scope.publish = function (message) {

		        alert([$scope.channel]);

		        $scope.subscribe();

		        //toggle the progress bar
		        $('#progress_bar').slideToggle();

		        PUBNUB.publish({
		            channel: $scope.channel,
		            message: message
		        }) 
             
		        //reset the message text
		        message.text = "";
		    }

		    //gets the messages history   
		    //function history() {
		    $scope.history = function () {
		        PUBNUB.history({
		            channel: $scope.channel,
		            limit: $scope.limit
		        }, function (messages) {
		            // Shows All Messages
		            $scope.$apply(function () {
		                $scope.messages = messages.reverse();
		            });
		        });
		    }

		    //function subscribe() {
		    $scope.subscribe = function(){  
		        PUBNUB.subscribe({
		            channel: $scope.channel,
		            restore: false,

		            callback: function (message) {

		                //toggle the progress_bar
		                $('#progress_bar').slideToggle();

		                $scope.$apply(function () {
		                    $scope.messages.unshift(message);
		                });
		            },

		            disconnect: function () {
		                $scope.$apply(function () {
		                    $scope.realtimeStatus = 'Inte ansluten';
		                });
		            },

		            reconnect: function () {
		                $scope.$apply(function () {
		                    $scope.realtimeStatus = 'Ansluten';
		                });
		            },

		            connect: function () {
		                $scope.$apply(function () {
		                    $scope.realtimeStatus = 'Ansluten';
		                    //hide the progress bar
		                    $('#progress_bar').slideToggle();
		                    //load the message history from PubNub
		                    $scope.history();
		                });
		            }
		        })
		    }

			// Apply the remote data to the local view model.
		    function applyRemoteData(room, chats)
		    {
		        $scope.room = room;
				$scope.chats = _.sortOnProperty( chats, "name", "asc" );

				$scope.setWindowTitle(room.name);
				$scope.channel = $scope.room.id + "_chat";

		        //subscribe();
				$scope.subscribe();
			}

			// Load the remote data from the server.
		    function loadRemoteData()
		    {
			    $scope.isLoading = true;

				var promise = $q.all(
					[
						roomService.getRoomByID( $scope.roomID ),
						chatService.getChatsByRoomID($scope.roomID),
					]
				);

				promise.then(
					function (response)
					{
						$scope.isLoading = false;
						applyRemoteData(response[0], response[1]);
					},
					function (response)
					{
						// The room couldn't be loaded for some reason - possibly someone hacking with the URL. 
					    $location.path( "/chat" );
					}
				);

			}

			// --- Define Scope Methods. ------------------------ //

			// ...

			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.chat.chatlist", "roomID" );
			
			// --- Define Scope Variables. ---------------------- //

			// Get the ID of the room.
			$scope.roomID = requestContext.getParam( "roomID" );

			// Flag for that data is being loaded.
			$scope.isLoading = true;

			// The room and the list of chats that are being viewed.
			$scope.room = null;
			$scope.chats = null;

			// The subview indicates which view is going to be rendered on the page.
			$scope.subview = renderContext.getNextSection();

			// --- Bind To Scope Events. ------------------------ //

			// Handle changes to the request context.
			$scope.$on(
				"requestContextChanged",
				function ()
				{
					// Make sure this change is relevant to this controller.
					if ( ! renderContext.isChangeRelevant() ) {
						return;
					}

					// Get the relevant route IDs.
					$scope.roomID = requestContext.getParam("roomID");

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

					// If the relevant IDs have changed, refresh the view.
					if (requestContext.hasParamChanged("roomID")) {
					    loadRemoteData();
					}
				}
			);

			// --- Initialize. ---------------------------------- //

			// Set the interim title.
			$scope.setWindowTitle( "Laddar chattrum" );

			// Load the "remote" data.
			loadRemoteData();
		}
	);

})(angular, Intlec);