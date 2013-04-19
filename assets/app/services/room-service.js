(function (ng, app)
{	
	"use strict";

	// I provide a repository for the categories.
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
					name: "room101",
					description: "Datorkunskap rum 101",
				},
				{
				    id: "room201",
				    name: "room201",
				    description: "Datorkunskap rum 201."
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