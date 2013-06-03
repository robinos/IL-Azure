//This should be replaced by retrieving the room list from the administration client
(function (ng, app)
{	
	"use strict";

	//Provide a repository for the categories.
	app.service(
		"roomService",
		function ($q, _)
		{
			// Get all of the rooms.
		    function getRooms()
		    {
				var deferred = $q.defer();
				
				deferred.resolve( ng.copy( cache ) );

				return( deferred.promise );
			}

			// Get the room with the given ID.
		    function getRoomByID(id)
		    {
				var deferred = $q.defer();
				var room = _.findWithProperty( cache, "id", id );

				if ( room ) {
					deferred.resolve( ng.copy( room ) );
				} else {
					deferred.reject();
				}
				return( deferred.promise );
			}

			// ---------------------------------------------- //
			// ---------------------------------------------- //

			// Set up the rooms data cache. For this demo, we'll just use static data.
			var cache = [
				{
					id: "room101",
					name: "Room 101",
					description: "Computer Knowledge - room 101.",
				},
				{
				    id: "room201",
				    name: "Room 201",
				    description: "Computer Knowledge - room 201."
				}
			];

			// ---------------------------------------------- //
			// ---------------------------------------------- //

			// Return the public API.
			return({
				getRooms: getRooms,
				getRoomByID: getRoomByID
			});
		}
	);

})(angular, Intlec);