(function() {
	
	new View('talks', {
		
		initialize: function() {
		
			//
		
		},
		
		on: {
			layout: function() {
				
				var availableHeight = app.viewportSize.height
					- this.$('.titlebar').height()
					- this.$('.toolbar').height();
					
				this.$('.container').css({
					height: availableHeight,
					top: this.$('.titlebar').height()
				});
				
			},
			visible: function() {
				
				this.renderTalks();
				
				// iOS: Change status bar style to match view style
				app.changeStatusBarStyle('black');
				
				// Analytics
				// app.trackEvent( 'googleanalytics', 'Rewards', { category: 'view', action: 'visible' } );
				// app.trackEvent( 'mixpanel', 'Viewing Rewards', {} );
				
			}
		},
		
		buttons: {
			'.close': 'back'
		},
		
		back: function() {
			app.view('home').reveal('slide-down');
		},
		
		renderTalks: function() {
		
			var $list = this.$('.list');
				$list.html('');
			
			var talks = app.data.meetup.talks;
			
			_.each(talks, function(talk) {
			
				var html = '<li>' +
					'<span class="title">' + talk.name + '</span>' +
					'<span class="people">';
				
				var names = [],
					twitters = [];
				
				_.each(talk.who, function(who) {
					if (who.name) names.push(who.name.first + ' ' + who.name.last);
					if (who.twitter) twitters.push(who.twitter);
				});
				
				if (names.length) {
					html += '<span class="authors">';
					_.each(names, function(name, index) {
						if (names.length > 1 && names.length == index + 1) html += ' & ';
						html += '<span class="author">' + name + '</span>';
					});
					html += '</span>';
				}
				
				if (twitters.length) {
					html += '<span class="twitters">';
					_.each(twitters, function(twitter, index) {
						if (twitters.length > 1 && twitters.length == index + 1) html += ' & ';
						if (twitter.slice(0,1) != '@') twitter = '@' + twitter;
						html += '<a href="http://twitter.com/' + twitter.slice(1) + '" class="twitter" target="_blank">' + twitter + '</a>';
					});
					html += '</span>';
				}
				
				html += '</span>' +
					'</li>';
				
				$(html).appendTo($list);
			
			});
		
		}
		
	});
	
})();