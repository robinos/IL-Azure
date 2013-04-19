(function (ng, app) {

	"use strict";

	app.controller(
		"chat.ChatListController",
		function( $scope, $location, $q, requestContext, roomService, chatService, _ ) { //pusherService,

		    function refreshMessageItems() {
		        var query = messageItemTable.where({ teacher: false });

		        query.read().then(function (messageItems) {
		            var listItems = $.map(messageItems, function (item) {
		                return $('<li>')
                            .attr('data-messageitem-id', item.id)
                            .append($('<button class="item-delete">Delete</button>'))
                            //.append($('<input type="checkbox" class="item-complete">').prop('checked', item.teacher))
                            .append($('<div>').append($('<input class="item-text">').val(item.text)));
		            });

		            $('#message-items').empty().append(listItems).toggle(listItems.length > 0);
		            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
		        });
		    }

		    function getMessageItemId(formElement) {
		        return Number($(formElement).closest('li').attr('data-messageitem-id'));
		    }

		    // Handle insert
		    $('#add-item').submit(function (evt) {
		        var textbox = $('#new-item-text'),
                    itemText = textbox.val();
		        var time = new Date().getTime();
		        if (itemText !== '') {
		            messageItemTable.insert({ text: itemText, timestamp: time, teacher: false }).then(refreshMessageItems);
		        }
		        textbox.val('').focus();
		        evt.preventDefault();
		    });

		    // Handle update
		    $(document.body).on('change', '.item-text', function () {
		        var newText = $(this).val();
		        messageItemTable.update({ id: getMessageItemId(this), text: newText });
		    });

		    //$(document.body).on('change', '.item-complete', function () {
		    //    var isTeacher = $(this).prop('checked');
		    //    messageItemTable.update({ id: getMessageItemId(this), teacher: isTeacher }).then(refreshMessageItems);
		    //});

		    // Handle delete
		    $(document.body).on('click', '.item-delete', function () {
		        messageItemTable.del({ id: getMessageItemId(this) }).then(refreshMessageItems);
		    });

		    // On initial load, start by fetching the current data
		    refreshMessageItems();

		    // --- Define Controller Variables. ----------------- //

		    //$scope.messages = [];
		    //$scope.message = {
		    //    name: name = "",
		    //    text: message = ""
		    //}
		    //$scope.realTimeStatus = pusherService.pusherStatusUpdate();

			//// --- Define Controller Methods. ------------------- //

            ////Subscribe to the Pusher and channel
		    //function subscribe () {
		    //    pusherService.pusherInitialise();
		    //    pusherService.pusherSubscribe();

		    //    realTimeStatus = pusherService.pusherStatusUpdate();
		    //};

		    ////publish a chat message
		    //function publish() {
		    //    //toggle the progress bar
		    //    $('#progress_bar').slideToggle();

		    //    pusherService.pusherBind({
		    //        command: 'message',
		    //        commandFunction: $scope.message.text
		    //    })

		    //    messages.push(message);

		    //    //reset the message text
		    //    message.text = "";
		    //}

		    ////Gets the messages history   
		    //function history() {
		    //    return(messages);
		    //}

			// Apply the remote data to the local view model.
		    function applyRemoteData(room, chats)
		    {
				$scope.room = room;
				$scope.chats = _.sortOnProperty( chats, "name", "asc" );

				$scope.setWindowTitle( room.name );				
			}

			// Load the remote data from the server.
		    function loadRemoteData()
		    {
			    $scope.isLoading = true;

				var promise = $q.all(
					[
						roomService.getRoomByID( $scope.roomID ),
						chatService.getChatsByRoomID( $scope.roomID )
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

			// Get the ID of the category.
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
					$scope.roomID = requestContext.getParam( "roomID" );

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

					// If the relevant IDs have changed, refresh the view.
					if ( requestContext.hasParamChanged( "roomID" ) ) {
					    loadRemoteData();
					    refreshMessageItems();
					}

				}
			);

			// --- Initialize. ---------------------------------- //

			// Set the interim title.
			$scope.setWindowTitle( "Loading Room" );

			// Load the "remote" data.
			loadRemoteData();
		}
	);

})(angular, Intlec);