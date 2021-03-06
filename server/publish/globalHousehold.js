/**
 * Created by Anush-PC on 7/19/2016.
 */

Meteor.publish(
  'globalHousehold', function publishGlobalHousehold() {
    const self = this;

    let globalHousehold = [];
    if (self.userId) {
      HMISAPI.setCurrentUserId(self.userId);
      globalHousehold = HMISAPI.getGlobalHouseholdForPublish();
    } else {
      HMISAPI.setCurrentUserId('');
    }
    _.each(globalHousehold, (item) => {
      self.added('globalHousehold', item.globalHouseholdId, item);
    });

    self.ready();
  }
);

Meteor.publish(
  'singleGlobalHousehold', function publishSingleGlobalHousehold(globalHouseholdId) {
    const self = this;
    let singleGlobalHousehold = false;
    if (self.userId) {
      HMISAPI.setCurrentUserId(self.userId);
      singleGlobalHousehold = HMISAPI.getSingleGlobalHouseholdForPublish(globalHouseholdId);
    } else {
      HMISAPI.setCurrentUserId('');
    }
    if (singleGlobalHousehold) {
      self.added('globalHousehold', singleGlobalHousehold.globalHouseholdId, singleGlobalHousehold);
    }
    self.ready();
  }
);
