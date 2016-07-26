/**
 * Created by udit on 26/07/16.
 */

Meteor.methods(
  {
    adminInsertDoc(doc, collection) {
      let result = false;
      if (Roles.userIsInRole(this.userId, [`create_${collection}`])) {
        this.unblock();
        result = adminCollectionObject(collection).insert(doc);
      }
      return result;
    },
    adminUpdateDoc(modifier, collection, _id) {
      let result = false;
      if (Roles.userIsInRole(this.userId, [`edit_${collection}`])) {
        this.unblock();
        logger.info(modifier);
        result = adminCollectionObject(collection).update({ _id }, modifier);
      }
      return result;
    },
    adminRemoveDoc(collection, _id) {
      let val = '';
      if (Roles.userIsInRole(this.userId, [`delete_${collection}`])) {
        this.unblock();
        val = adminCollectionObject(collection).remove({ _id });
      }
      return val;
    },
    adminCheckAdmin() {
      let adminEmails = [];
      const user = Meteor.users.findOne({ _id: this.userId });
      const developerPermissions = AdminConfig.defaultRolePermissions.Developer;
      if (this.userId && !Roles.userIsInRole(this.userId, developerPermissions)
          && user.emails && (user.emails.length > 0)) {
        const email = user.emails[0].address;
        if (typeof Meteor.settings.adminEmails !== 'undefined') {
          adminEmails = Meteor.settings.adminEmails;
          if (adminEmails.indexOf(email) > -1) {
            logger.info(`Adding admin user: ${email}`);
            return Roles.addUsersToRoles(this.userId, developerPermissions, Roles.GLOBAL_GROUP);
          }
        } else if (typeof AdminConfig !== 'undefined'
           && typeof AdminConfig.adminEmails === 'object') {
          adminEmails = AdminConfig.adminEmails;
          if (adminEmails.indexOf(email) > -1) {
            logger.info(`Adding admin user: ${email}`);
            return Roles.addUsersToRoles(this.userId, developerPermissions, Roles.GLOBAL_GROUP);
          }
        } else if (this.userId === Meteor.users.findOne({}, {
          sort: { createdAt: 1 } })._id) {
          logger.info(`Making first user admin: ${email}`);
          return Roles.addUsersToRoles(this.userId, developerPermissions, Roles.GLOBAL_GROUP);
        }
      }
      return false;
    },
    adminSetCollectionSort(collection, _sort) {
      return global.AdminPages[collection].set({
        sort: _sort,
      });
    },
  }
);