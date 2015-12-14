/**
 * Created by udit on 13/12/15.
 */
surveys = new Meteor.Collection( 'surveys' );

Schemas.surveys = new SimpleSchema( {
	title: {
		type: String,
		max: 256
	},
	content: {
		type: String,
		autoform: {
			rows: 5
		}
	},
	createdAt: {
		type: Date,
		label: 'Date',
		autoValue: function () {
			if ( this.isInsert ) {
				return new Date();
			}
		}
	},
	author: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoValue: function () {
			if ( this.isInsert ) {
				return Meteor.userId();
			}
		},
		autoform: {
			options: function () {
				_.map(Meteor.users.find().fetch(), function (user) {
					return {
						label: user.emails[0].address,
						value: user._id
					};
				} );
			}
		}
	}
} );

surveys.attachSchema( Schemas.surveys );
