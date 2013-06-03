//This remains as a placeholder file for setting special attributes on chat rooms.
//It is still used with the demo to retrieve the chat rooms using room-service, so alter with care.
(function (ng, app)
{
	"use strict";

	// Provide a repository for the chat.
	app.service(
		"chatService",
		function( $q, _ ) {

			// Get the chat with the given ID.
		    function getChatByID(id)
		    {
				var deferred = $q.defer();
				var chat = _.findWithProperty( cache, "id", id );

				if ( chat ) {
					deferred.resolve( ng.copy( chat ) );
				} else {
					deferred.reject();
				}
				return( deferred.promise );
			}

			// Get the chats in the given room.
		    function getChatsByRoomID(roomID)
		    {
				var deferred = $q.defer();
				var chats = _.filterWithProperty( cache, "roomID", roomID );

				if (chats) {
					deferred.resolve( ng.copy( chats ) );
				} else {
					deferred.reject();
				}
				return( deferred.promise );
			}

			// ---------------------------------------------- //
			// ---------------------------------------------- //

			// Set up a collection of constants for our chat rooms. Normally, this would be managed
			// by the server-side relational database; but, since we're using static data, this will 
			// just make the code easier to read.
			var rooms = {
			    room101: "room101",
			    room201: "room201"
			};


            //**The following should be removed, along with other references to this old code.**

			// Set up a collection of size constants.
			var sizes = {
				small: "Small, 25 lbs or less",
				medium: "Medium, 26 - 60 lbs",
				large: "Large, 61 - 100 lbs",
				huge: "Huge, more than 100 lbs"
			};

			// Set up the pets data cache. For this demo, we'll just use static data.
			var cache = [
				{
					id: 1,
					roomID: rooms.room101,
					name: "Annie",
					breed: "Pit Bull Terrier",
					color: "Tricolor",
					sex: "F",
					size: sizes.small,
					description: "I love chewing on shoes.",
					background: "Annie was found in an abandoned house in Brooklyn.",
					diet: "Annie loves raw chicken necks.",
					medicalHistory: "Annie has all of her shots."
				},
				{
					id: 2,
					roomID: rooms.room101,
					name: "Voodoo",
					breed: "Chihuahua",
					color: "White With Black",
					sex: "F",
					size: sizes.small,
					description: "I am house-trained, but when I get excited, I sometimes tinkle.",
					background: "Voodoo was one of 17 dogs found in a hoarder's house.",
					diet: "Voodoo will eat just about anything.",
					medicalHistory: "Voodoo has all of his shots and is spayed."
				},
				{
					id: 3,
					roomID: rooms.room101,
					name: "Frodo",
					breed: "Yorkie",
					color: "Silver With Blue",
					sex: "F",
					size: sizes.small,
					description: "I want to lick your face ... a lot.",
					background: "Frodo went on a great adventure!",
					diet: "Frodo loves chicken and fish and peanut butter.",
					medicalHistory: "Frodo has all of his shots."
				},
				{
					id: 4,
					roomID: rooms.room101,
					name: "Brook",
					breed: "Labrador Retriever",
					color: "Yellow",
					sex: "M",
					size: sizes.large,
					description: "I'll eat anything, but newspaper makes me gassy.",
					background: "Brook was found walking along George Washington Bridge.",
					diet: "Brook loves any duck-based food.",
					medicalHistory: "Brook has all of her shots."
				},
				{
					id: 5,
					roomID: rooms.room201,
					name: "Henry",
					breed: "Bulldog",
					color: "Tricolor",
					sex: "M",
					size: sizes.medium,
					description: "I'm surprisingly active and can jump!",
					background: "Henry's owner recently passed and was left with no family.",
					diet: "Henry prefers dry food.",
					medicalHistory: "Henry has all of his shots and is fixed."
				},
			];

			// ---------------------------------------------- //
			// ---------------------------------------------- //

			// Return the public API.
			return({
				getChatByID: getChatByID,
				getChatsByRoomID: getChatsByRoomID
			});
		}
	);
})(angular, Intlec);