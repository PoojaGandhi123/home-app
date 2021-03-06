/**
 * Created by udit on 13/12/15.
 */
surveys = new Meteor.Collection('surveys');

Schemas.surveys = new SimpleSchema(
  {
    title: {
      type: String,
    },
    active: {
      type: Boolean,
    },
    copy: {
      type: Boolean,
    },
    stype: {
      type: String,
    },
    surveyCopyID: {
      type: String,
      optional: true,
    },
    locked: {
      type: Boolean,
    },
    apiSurveyServiceId: {
      type: String,
      optional: true,
    },
    createdAt: {
      type: Date,
      label: 'Created At',
      autoValue() {
        let returnstatus;
        if (this.isInsert) {
          returnstatus = new Date();
        } else if (this.isUpsert) {
          returnstatus = { $setOnInsert: new Date() };
        } else {
          this.unset();  // Prevent user from supplying their own value
        }
        return returnstatus;
      },

    },
    updatedAt: {
      type: Date,
      label: 'Updated At',
      autoValue() {
        return new Date();
      },
    },
    created: {
      type: Boolean,
    },
    // author: {
    //	type: String,
    //	regEx: SimpleSchema.RegEx.Id,
    //	autoValue: function () {
    //		if ( this.isInsert ) {
    //			return Meteor.userId();
    //		}
    //	},
    //	autoform: {
    //		options: function () {
    //			return _.map(Meteor.users.find().fetch(), function (user) {
    //				return {
    //					label: user.emails[0].address.toLowerCase(),
    //					value: user._id
    //				};
    //			} );
    //		}
    //	}
    // }
  }
);

surveys.attachSchema(Schemas.surveys);
