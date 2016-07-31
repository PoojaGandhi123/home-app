/**
 * Created by udit on 28/07/16.
 */

Router.route('dashboard', {
  path: '/dashboard',
  template: 'Dashboard',
  controller: 'AppController',
  action() {
    return this.render();
  },
  onAfterAction() {
    Session.set('admin_title', 'Dashboard');
    Session.set('admin_collection_name', '');
    Session.set('admin_collection_page', '');
  },
});
