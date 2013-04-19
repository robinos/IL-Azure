(function (ng, app)
{
	"use strict";

	app.service(
		"pusherService",
		function( $q, _ )
		{
		    // Enable pusher logging - don't include this in production
		    Pusher.log = function (message) {
		        if (window.console && window.console.log) window.console.log(message);
		    }

		    // Flash fallback logging - don't include this in production
		    WEB_SOCKET_DEBUG = true;

		    // Variables
		    var pusher = null;
		    var channel = null; 
		    var realtimeStatus = "startup";

		    // Methods
		    //Called to set the Pusher
		    function pusherInitialise() {
		        var deferred = $q.defer();
		        deferred.resolve( pusher = new Pusher('057358e5f63b150193fe') ); //, { encrypted: true });
		        return ( deferred.promise );
		    }

		    //Called to set the channel
		    function pusherSubscribe() {
		        var deferred = $q.defer();
		        deferred.resolve(channel = pusher.subscribe('test_channel'));
		        return ( deferred.promise );
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