// ----------------------------------------------------------------------------
// Reusable bindings - ideally kept in a separate file

ko.bindingHandlers.starRating = {
    init: function (element, valueAccessor) {
        $(element).addClass("starRating");
        for (var i = 0; i < 5; i++)
            $("<span>").appendTo(element);

        // Handle mouse events on the stars
        $("span", element).each(function (index) {
            $(this).hover(
                function () { $(this).prevAll().add(this).addClass("hoverChosen") },
                function () { $(this).prevAll().add(this).removeClass("hoverChosen") }
            ).click(function () {
                var observable = valueAccessor();  // Get the associated observable
                observable(index + 1);               // Write the new rating to it
            });
        });
    },
    update: function (element, valueAccessor) {
        // Give the first x stars the "chosen" class, where x <= rating
        var observable = valueAccessor();
        $("span", element).each(function (index) {
            $(this).toggleClass("chosen", index < observable());
        });
    }
};

// ----------------------------------------------------------------------------
// Page viewmodel

(function (ng, app) {

	"use strict";

	app.controller(
		"quiz.QuizController",
		function( $scope, requestContext, _ ) {


			// --- Define Controller Methods. ------------------- //
		    function Answer(text) { this.answerText = text; this.points = ko.observable(1); }

		    function SurveyViewModel(question, answers) {
		        var self = this;

		        self.question = question;
		        self.answers = $.map(answers, function (text) { return new Answer(text) });

		        self.pointsUsed = ko.computed(function () {
		            var total = 0;
		            for (var i = 0; i < this.answers.length; i++)
		                total += self.answers[i].points();
		            return total;
		        }, this);

		        self.save = function () {
		            $('#container').highcharts({
		                chart: {
		                    type: 'bar'
		                },
		                title: {
		                    text: 'Granssnittsvarden: '
		                },
		                subtitle: {
		                    text: null
		                },
		                xAxis: {
		                    categories: [self.answers[0].answerText, self.answers[1].answerText, self.answers[2].answerText, self.answers[3].answerText],
		                    title: {
		                        text: null
		                    }
		                },
		                yAxis: {
		                    min: 0,
		                    title: {
		                        text: 'Betyg (poang)',
		                        align: 'high'
		                    },
		                    labels: {
		                        overflow: 'justify'
		                    }
		                },
		                tooltip: {
		                    valueSuffix: ' poang'
		                },
		                plotOptions: {
		                    bar: {
		                        dataLabels: {
		                            enabled: true
		                        }
		                    }
		                },
		                legend: {
		                    layout: 'vertical',
		                    align: 'right',
		                    verticalAlign: 'bottom',
		                    x: -100,
		                    y: 100,
		                    floating: true,
		                    borderWidth: 1,
		                    backgroundColor: '#FFFFFF',
		                    shadow: true
		                },
		                credits: {
		                    enabled: false
		                },
		                series: [{
		                    name: self.question,
		                    data: [self.answers[0].points(), self.answers[1].points(), self.answers[2].points(), self.answers[3].points()]
		                    //}, {
		                    //    name: 'Year 1900',
		                    //    data: [133, 156, 947, 408, 6]
		                    //}, {
		                    //    name: 'Year 2008',
		                    //    data: [973, 914, 4054, 732, 34]
		                }]
		            });
		        };
		    }

		    ko.applyBindings(new SurveyViewModel("Betygsatt din forstaelse: ", [
               "Lab1 procedur",
               "Signaturer i PHP",
               "Monitorer",
               "Stor O notation"
		    ]));

			// ...


			// --- Define Scope Methods. ------------------------ //


			// ...


			// --- Define Controller Variables. ----------------- //


			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.quiz" );

			
			// --- Define Scope Variables. ---------------------- //


			// The subview indicates which view is going to be rendered on the page.
			$scope.subview = renderContext.getNextSection();
			

			// --- Bind To Scope Events. ------------------------ //


			// I handle changes to the request context.
			$scope.$on(
				"requestContextChanged",
				function() {

					// Make sure this change is relevant to this controller.
					if ( ! renderContext.isChangeRelevant() ) {

						return;

					}

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

				}
			);


			// --- Initialize. ---------------------------------- //


			$scope.setWindowTitle( "Quiz" );


		}
	);

})(angular, Intlec);