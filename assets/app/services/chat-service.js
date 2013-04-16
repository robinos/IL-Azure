(function( ng, app ) {
	
	"use strict";

	// I provide a repository for the chat.
	app.service(
		"chatService",
		function( $q, _ ) {


			// I get the pet with the given ID.
			function getChatByID( id ) {

				var deferred = $q.defer();
				var chat = _.findWithProperty( cache, "id", id );

				if ( chat ) {

					deferred.resolve( ng.copy( chat ) );

				} else {

					deferred.reject();

				}

				return( deferred.promise );

			}


			// I get the chats in the given category.
			function getChatsByCategoryID( categoryID ) {

				var deferred = $q.defer();
				var chats = _.filterWithProperty( cache, "categoryID", categoryID );

				if (chats) {

					deferred.resolve( ng.copy( chats ) );

				} else {

					deferred.reject();

				}

				return( deferred.promise );

			}


			// I get a random chat in the given category, less the given chat.
			function getRandomChatExcluding( categoryID, excludeChatID ) {

				var deferred = $q.defer();
				var chats = _.filterWithProperty( cache, "categoryID", categoryID );

				if (chats) {

					var index = _.random( 0, ( chats.length - 1 ) );

					while (chats[index].id === excludeChatID) {

					    index = _.random(0, (chats.length - 1));

					}

					deferred.resolve(ng.copy(chats[index]));

				} else {

					deferred.reject();

				}

				return( deferred.promise );

			}


			// ---------------------------------------------- //
			// ---------------------------------------------- //


			// Set up a collection of constants for our pet categories. Normally, this would be managed
			// by the server-side relational database; but, since we're using static data, this will 
			// just make the code easier to read.
			var categories = {
				chat: "chat"
			};

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
					categoryID: categories.chat,
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
					categoryID: categories.chat,
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
					categoryID: categories.chat,
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
					categoryID: categories.chat,
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
					categoryID: categories.chat,
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
				getChatsByCategoryID: getChatsByCategoryID,
				getRandomChatExcluding: getRandomChatExcluding
			});


		}
	);

})(angular, Intlec);