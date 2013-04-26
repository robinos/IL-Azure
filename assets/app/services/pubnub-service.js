(function (ng, app)
{
	"use strict";

	app.service(
		"pubnubService",
		function( $q, _ )
		{
		    // Variables
		    var messages = [];
		    var realtimeStatus = "Connecting...";
		    var channel = "pubnub_chat";
		    var limit = 20;

		    // Methods
		    function pubnubSubscribe() {
		        PUBNUB.subscribe({
		            channel: channel,
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
		                    $scope.realtimeStatus = 'Disconnected';
		                });
		            },

		            reconnect: function () {
		                $scope.$apply(function () {
		                    $scope.realtimeStatus = 'Connected';
		                });
		            },

		            connect: function () {
		                $scope.$apply(function () {
		                    $scope.realtimeStatus = 'Connected';
		                    //hide the progress bar
		                    $('#progress_bar').slideToggle();
		                    //load the message history from PubNub
		                    $scope.history();
		                });
		            }
		        })
		    }

            //Called to bind an item to the channel
		    function pusherBind(command, commandFunction) {
		        var deferred = $q.defer();
		        if (channel !== null) {
		            deferred.resolve( channel.bind(command, commandFunction) );
		        }
		        else {
		            deferred.reject();
		        }
                return ( deferred.promise );
		    }

		    //Update status
		    function pusherStatusUpdate() {
		        var deferred = $q.defer();
		        deferred.resolve( realTimeStatus = pusher.connection.state );
		        return (deferred.promise);
		    }

			// ---------------------------------------------- //
			// ---------------------------------------------- //

			// Return the public API.
		    return ({
		        pusherInitialise: pusherInitialise,
			    pusherSubscribe: pusherSubscribe,
			    pusherBind: pusherBind,
                pusherStatusUpdate: pusherStatusUpdate
			});
		}
	);
})(angular, Intlec);