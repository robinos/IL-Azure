(function (ng, app)
{
	"use strict";

	app.service(
		"azureService",
		function( $q, _ )
		{
		    // Variables
		    var client = null;
		    var messageItemTable = null;
            
		    // Methods
		    //Called to set the client
		    function azureInitialise() {
		        var deferred = $q.defer();
		        deferred.resolve( client = new WindowsAzure.MobileServiceClient('https://interactivelecture.azure-mobile.net/', 'hODmTfJKYkxAuxrlYUwRLgLevxBQUg19') );
		        return ( deferred.promise );
		    }

		    //Called to get the message table
		    function azureGetMessages() {
		        var deferred = $q.defer();
		        if (client !== null) {
		            deferred.resolve( messageItemTable = client.getTable('messages') );
		        }
		        else {
		            deferred.reject();
		        }
		        return (deferred.promise);
		    }

			// ---------------------------------------------- //
			// ---------------------------------------------- //

			// Return the public API.
		    return ({
		        azureInitialise: azureInitialise,
		        azureGetMessages: azureGetMessages
			});
		}
	);
})(angular, Intlec);