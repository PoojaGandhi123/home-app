/**
 * Created by udit on 13/12/15.
 */

HomeConfig = {
  name: 'H O M E',
  adminEmails: [
    'desaiuditd@gmail.com',
    'mparihar@scu.edu',
    'javier@ctagroup.org',
    'bob@ctagroup.org',
    'emma@ctagroup.org',
  ],
  defaultHomeRoles: [
    'Developer',
    'System Admin',
    'Admin',
    'Program Manager',
    'Case Manager',
    'Surveyor',
  ],
  defaultPermissions: [
    'Developer',
    'System Admin',
    'Admin',
    'Program Manager',
    'Case Manager',
    'Surveyor',
    'view_organization',
    'create_organization',
    'edit_organization',
    'delete_organization',
    'update_referral',
    'view_user',
    'create_user',
    'edit_user',
    'delete_user',
    'manage_user_role',
    'manage_user_status',
    'reset_user_password',
    'view_reports',
    'view_survey',
    'create_survey',
    'edit_survey',
    'delete_survey',
    'view_project',
    'create_project',
    'edit_project',
    'delete_project',
    'view_inventory',
    'create_inventory',
    'edit_inventory',
    'delete_inventory',
    'view_intake',
    'create_intake',
    'edit_intake',
    'delete_intake',
    'manage_settings',
  ],
  defaultRolePermissions: {
    Developer: [
      'Developer',
      'System Admin',
      'Admin',
      'Program Manager',
      'Case Manager',
      'Surveyor',
      'view_organization',
      'create_organization',
      'edit_organization',
      'delete_organization',
      'update_referral',
      'view_user',
      'create_user',
      'edit_user',
      'delete_user',
      'manage_user_role',
      'manage_user_status',
      'reset_user_password',
      'view_reports',
      'view_survey',
      'create_survey',
      'edit_survey',
      'delete_survey',
      'view_project',
      'create_project',
      'edit_project',
      'delete_project',
      'view_inventory',
      'create_inventory',
      'edit_inventory',
      'delete_inventory',
      'view_intake',
      'create_intake',
      'edit_intake',
      'delete_intake',
      'manage_settings',
    ],
    'System Admin': [
      'System Admin',
      'Admin',
      'Program Manager',
      'Case Manager',
      'Surveyor',
      'view_organization',
      'create_organization',
      'edit_organization',
      'delete_organization',
      'update_referral',
      'view_user',
      'create_user',
      'edit_user',
      'delete_user',
      'manage_user_role',
      'manage_user_status',
      'reset_user_password',
      'view_reports',
      'view_survey',
      'create_survey',
      'edit_survey',
      'delete_survey',
      'view_project',
      'create_project',
      'edit_project',
      'delete_project',
      'view_inventory',
      'create_inventory',
      'edit_inventory',
      'delete_inventory',
      'view_intake',
      'create_intake',
      'edit_intake',
      'delete_intake',
      'manage_settings',
    ],
    Admin: [
      'Admin',
      'Program Manager',
      'Case Manager',
      'Surveyor',
      'view_user',
      'create_user',
      'edit_user',
      'delete_user',
      'reset_user_password',
      'view_reports',
      'view_project',
      'create_project',
      'edit_project',
      'delete_project',
      'view_inventory',
      'create_inventory',
      'edit_inventory',
      'delete_inventory',
    ],
    'Program Manager': [
      'Program Manager',
      'Case Manager',
      'Surveyor',
      'view_user',
      'view_reports',
      'view_inventory',
      'edit_inventory',
    ],
    'Case Manager': [
      'Case Manager',
      'Surveyor',
      'update_referral',
      'view_inventory',
      'view_intake',
      'create_intake',
      'edit_intake',
      'delete_intake',
    ],
    Surveyor: [
      'Surveyor',
      'view_survey',
      'view_intake',
      'create_intake',
      'edit_intake',
      'delete_intake',
    ],
  },
  /* eslint-disable */
  adminTablesDom: '<"box"<"box-header"<"box-toolbar"<"clearfix"ri><"pull-left"<lf>><"pull-right"p>>><"box-body table-responsive"t>>',
  /* eslint-enable */
  appEditButton: {
    data: '_id',
    title: 'Edit',
    createdCell(node, cellData/* , rowData */) {
      $(node).html(Blaze.toHTMLWithData(Template.AppEditBtn, { _id: cellData }));
    },
    width: '45px',
    orderable: false,
  },
  appDelButton: {
    data: '_id',
    title: 'Delete',
    createdCell(node, cellData/* , rowData */) {
      $(node).html(Blaze.toHTMLWithData(Template.AppDeleteBtn, { _id: cellData }));
    },
    width: '45px',
    orderable: false,
  },
  fontFamilies: [
    'Arial',
    'Arial Black',
    'Comic Sans MS',
    'Courier New',
    'Helvetica Neue',
    'Helvetica',
    'Impact',
    'Lucida Grande',
    'Raleway',
    'Tahoma',
    'Times New Roman',
    'Verdana',
  ],
  collections: {
    clients: {
      icon: 'user',
      label: 'Clients',
      widgetLabel: 'Pending Clients',
      userRoles: ['Developer', 'System Admin', 'Case Manager', 'Surveyor'],
      tableColumns: [
        {
          name: '_id',
          label: 'Client Name',
          render(value) {
            const client = clients.findOne({ _id: value });
            const name = (`${client.firstName.trim()} ${client.lastName.trim()}`).trim();
            return `<a href="/clients/${value}">${name}</a>`;
          },
        },
        {
          name: 'dob',
          label: 'Date of Birth',
          render(value) {
            return moment(value).format('MM/DD/YYYY');
          },
        },
      ],
      templates: {
        view: {
          name: 'searchClient',
          onAfterAction() {
            Session.set('admin_subtitle', 'Search');
          },
        },
        new: {
          name: 'createClient',
        },
        edit: {
          name: 'editClient',
          data() {
            const params = Router.current().params;
            return clients.findOne({ _id: params._id });
          },
        },
      },
      referralStatus: [
        {
          step: '0',
          title: 'Survey',
          desc: 'Client is surveyed',
          btnClass: 'btn-primary',
        },
        {
          step: '1',
          title: 'Agency Email',
          desc: 'Email sent to Referral Agency',
          btnClass: 'btn-primary',
        },
        {
          step: '2',
          title: 'Contact',
          desc: 'Client is contacted by Agency',
          btnClass: 'btn-primary',
        },
        {
          step: '3',
          title: 'Appointment',
          desc: 'Agency scheduled appointment with Client',
          btnClass: 'btn-primary',
        },
        {
          step: '4',
          title: 'Appointment Miss 1',
          desc: 'Client missed 1st appointment',
          btnClass: 'btn-warning',
        },
        {
          step: '5',
          title: 'Appointment Miss 2',
          desc: 'Client missed 2nd appointment',
          btnClass: 'btn-warning',
        },
        {
          step: '6',
          title: 'Paperwork',
          desc: 'Paperwork initiated by Agency',
          btnClass: 'btn-primary',
        },
        {
          step: '7',
          title: 'Accepatance',
          desc: 'Client accepted referral',
          btnClass: 'btn-success',
        },
        {
          step: '8',
          title: 'Move-in Prep',
          desc: 'Move-in Preparation initiated by Agency',
          btnClass: 'btn-success',
        },
        {
          step: '9',
          title: 'Move-in',
          desc: 'Client moved in',
          btnClass: 'btn-success',
        },
        {
          step: '10',
          title: 'Rejection',
          desc: 'Referral is rejected',
          btnClass: 'btn-danger',
        },
      ],
    },
    questions: {
      icon: 'question',
      label: 'Questions',
      showEditColumn: false,
      userRoles: ['Developer', 'System Admin'],
      tableColumns: [
        {
          name: 'name',
          label: 'Question Name',
          render(value) {
            const div = document.createElement('div');
            div.innerHTML = value;
            let text = div.textContent || div.innerText || value;

            if (text.length > 40) {
              text = text.substr(0, 40);
              text += ' ... ';
            }

            return text;
          },
        },
        {
          name: 'question',
          label: 'Question Label',
          render(value) {
            const div = document.createElement('div');
            div.innerHTML = value;
            let text = div.textContent || div.innerText || value;

            if (text.length > 40) {
              text = text.substr(0, 40);
              text += ' ... ';
            }

            return text;
          },
        },
        {
          name: 'category',
          label: 'Category',
        },
        {
          name: 'createdAt',
          label: 'Date created',
          render(value) {
            return moment(value).format('MM/DD/YYYY');
          },
        },
        {
          name: 'updatedAt',
          label: 'Date updated',
          render(value) {
            return moment(value).format('MM/DD/YYYY');
          },
        },
        {
          name: '_id',
          label: 'Edit',
          orderable: false,
          render(value, type, doc) {
            /* eslint-disable */
            return `<a href="#newQuestionModal" role="button" data-toggle="modal" data-survey-id="${doc._id}" class="btn btn-primary edit"><i class="fa fa-edit"></i></a>`;
            /* eslint-enable */
          },
        },
      ],
      templates: {
        view: {
          name: 'questionViewTemplate',
        },
      },
    },
    surveys: {
      icon: 'file-text',
      label: 'Surveys',
      showEditColumn: false,
      userRoles: ['Developer', 'System Admin'],
      tableColumns: [
        {
          name: 'title',
          label: 'Title',
          render(value, type, doc) {
            const obj = surveys.findOne({ _id: doc._id });

            const path = Router.path(
              `adminDashboard${Session.get('admin_collection_name')}Edit`,
              { _id: obj._id }
            );

            let val = value;

            if (obj.active) {
              /* eslint-disable */
              val = `<input type="hidden" id="newsurveyID" value="${obj.id}" /><a href="${path}">${value}</a>`;
              /* eslint-enable */
            }

            return val;
          },
        },
        {
          name: 'createdAt',
          label: 'Date created',
          render(value) {
            return moment(value).format('MM/DD/YYYY');
          },
        },
        {
          name: 'updatedAt',
          label: 'Date updated',
          render(value) {
            return moment(value).format('MM/DD/YYYY');
          },
        },
        {
          name: '_id',
          label: 'Edit',
          orderable: false,
          render(value, type, doc) {
            /* eslint-disable */
            return `<a href="#newSurveyModal" role="button" data-toggle="modal" data-survey-id="${doc._id}" class="btn btn-primary edit"><i class="fa fa-edit"></i></a>`;
            /* eslint-enable */
          },
        },
      ],
      templates: {
        view: {
          name: 'surveyViewTemplate',
        },
        edit: {
          name: 'surveyEditTemplate',
          data() {
            return Meteor.isClient && Session.get('admin_doc');
          },
        },
      },
    },
    responses: {
      icon: 'comment-o',
      label: 'Responses',
      showEditColumn: false,
      showDelColumn: false,
      userRoles: ['Developer', 'System Admin', 'Case Manager', 'Surveyor'],
      tableColumns: [
        {
          name: 'surveyID',
          label: 'Survey',
          render(value, type, doc) {
            const survey = surveys.findOne({ _id: value });
            const url = Router.path('adminDashboardresponsesEdit', { _id: doc._id });
            return `<a href="${url}">${survey.title}</a>`;
          },
        },
        {
          name: 'clientID',
          label: 'Client',
          render(value) {
            const client = clients.findOne({ _id: value });
            let fName = '';
            let mName = '';
            let lName = '';

            if (client && client.firstName) {
              fName = client.firstName.trim();
            }

            if (client && client.lastName) {
              lName = client.lastName.trim();
            }

            if (client && client.middleName) {
              mName = client.middleName.trim();
            }

            return `${fName} ${mName} ${lName}` || '';
          },
        },
        {
          name: 'timestamp',
          label: 'Date Updated',
          render(value) {
            return moment(value).format('MM/DD/YYYY');
          },
        },
        {
          name: 'responsestatus',
          label: 'Status',
          render(value) {
            let val = '';

            switch (value) {
              case 'Completed':
                val = '<span class="text-success">' +
                        '<i class="fa fa-check"></i> ' +
                        'Complete and submitted' +
                      '</span>';
                break;
              case 'Paused':
                val = '<span class="text-muted"><i class="fa fa-pause"></i> Paused</span>';
                break;
              default:
                val = value;
                break;
            }

            return val;
          },
        },
      ],
      templates: {
        new: {
          name: 'createResponse',
          data() {
            let client = '';
            if (this.params.query && this.params.query.isHMISClient) {
              client = Session.get('currentHMISClient') || false;
            } else {
              const clientID = this.params.query.client_id;
              client = clients.findOne({ _id: clientID });
            }

            const surveyID = this.params.query.survey_id;
            logger.log(`survey ${surveyID}`);
            const survey = surveys.findOne({ _id: surveyID });

            return { client, survey };
          },
        },
        edit: {
          name: 'editResponse',
          data() {
            const response = responses.findOne({ _id: this.params._id });
            let data = {};
            if (response) {
              let client = '';
              if (this.params.query && this.params.query.isHMISClient) {
                client = Session.get('currentHMISClient') || false;
              } else {
                client = clients.findOne({ _id: response.clientID });
              }

              const survey = surveys.findOne({ _id: response.surveyID });

              data = { client, survey, response };
            }

            return data;
          },
        },
      },
    },
    housingUnits: {
      icon: 'home',
      label: 'Housing Units',
      userRoles: ['Developer', 'System Admin', 'Program Manager'],
      tableColumns: [
        {
          title: 'Name',
          data: 'aliasName',
        },
        {
          title: 'Project',
          data: 'project.projectName',
        },
        {
          title: 'Vacant?',
          data: 'vacant',
          render(value) {
            /* eslint-disable */
            return value ? '<i class="fa fa-check js-tooltip" data-toggle="tooltip" data-placement="right" title=""></i>' : '';
            /* eslint-enable */
          },
        },
      ],
      templates: {
        view: {
          name: 'housingUnitsListView',
          waitOn() {
            return Meteor.subscribe('housingUnits');
          },
        },
        edit: {
          name: 'housingUnitEditView',
          waitOn() {
            const _id = Router.current().params._id;
            return Meteor.subscribe('singleHousingUnit', _id);
          },
          data() {
            const _id = Router.current().params._id;
            return housingUnits.findOne({ _id });
          },
        },
        new: {
          name: 'housingUnitCreateView',
        },
      },
    },
    housingMatch: {
      icon: 'bed',
      label: 'Housing Matching Service',
      userRoles: ['Developer', 'System Admin'],
      tableColumns: [
        {
          title: 'Reservation ID',
          data: 'reservation_id', // note: access nested data like this
        },
        {
          title: 'Client ID',
          data: 'client_id', // note: access nested data like this
        },
        {
          title: 'Housing Unit ID',
          data: 'housing_unit_id', // note: access nested data like this
        },
        {
          title: 'Match Date',
          data: 'match_date', // note: access nested data like this
        },
        {
          title: 'User ID',
          data: 'user_id', // note: access nested data like this
        },
        {
          title: 'Matched Status',
          data: 'matchedStatus', // note: access nested data like this
        },
      ],
      templates: {
        view: {
          name: 'housingMatchListView',
          data() {
            return {};
          },
          waitOn() {
            return Meteor.subscribe('housingMatch');
          },
        },
      },
    },
    globalHousehold: {
      icon: 'users',
      label: 'Global Household',
      userRoles: ['Developer', 'System Admin', 'Case Manager', 'Surveyor'],
      tableColumns: [
        {
          title: 'Global Household ID',
          data: 'globalHouseholdId', // note: access nested data like this
        },
        {
          title: 'Head of HouseHold ID',
          data: 'headOfHouseholdId', // note: access nested data like this
        },
        {
          title: 'Date Created',
          data: 'dateCreated', // note: access nested data like this
        },
        {
          title: 'Date Updated',
          data: 'dateUpdated', // note: access nested data like this
        },
        {
          title: 'User Created',
          data: 'userCreate', // note: access nested data like this
        },
        {
          title: 'Updated User',
          data: 'userUpdate', // note: access nested data like this
        },
        {
          title: 'Active?',
          data: 'inactive',
          orderable: false,
          render(value) {
            /* eslint-disable */
            return value ? '' : '<i class="fa fa-check js-tooltip" data-toggle="tooltip" data-placement="right" title=""></i>';
            /* eslint-enable */
          },
        },
      ],
      templates: {
        view: {
          name: 'globalHouseholdListView',
          data() {
            return {};
          },
          waitOn() {
            return Meteor.subscribe('globalHousehold');
          },
        },
        edit: {
          name: 'globalHouseholdEditView',
          waitOn() {
            const _id = Router.current().params._id;
            return Meteor.subscribe('singleGlobalHousehold', _id);
          },
          data() {
            const _id = Router.current().params._id;
            return globalHousehold.findOne({ _id });
          },
        },
        new: {
          name: 'globalHouseholdCreateView',
        },
      },
    },
    users: {
      icon: 'user-md',
      label: 'Users',
      userRoles: ['Developer', 'System Admin'],
      templates: {
        view: {
          name: 'AdminDashboardusersView',
          data() {
            return {
              admin_table: AdminTables.users,
            };
          },
        },
        edit: {
          name: 'AdminDashboardusersEdit',
          waitOn() {
            return [
              // Meteor.subscribe('projectGroups'),
              Meteor.subscribe('userProfiles'),
              Meteor.subscribe('hmisRoles'),
              Meteor.subscribe('singleHMISUser', Router.current().params._id),
            ];
          },
          data() {
            const hmisUsers = singleHMISUser.find({}).fetch();

            if (hmisUsers.length > 0) {
              const user = hmisUsers[0];
              if (Roles.userIsInRole(Meteor.user(), ['Developer', 'Super Admin'])) {
                user.editFormDisabled = '';
              } else {
                user.editFormDisabled = 'disabled';
              }
              return user;
            }

            return false;
          },
        },
        new: {
          name: 'AdminDashboardusersNew',
          waitOn() {
            return [
              // Meteor.subscribe('projectGroups'),
              Meteor.subscribe('userProfiles'),
              Meteor.subscribe('hmisRoles'),
            ];
          },
        },
      },
      changeSelector(selector) {
        const selectorz = selector;
        const $or = selectorz.$or;
        if ($or) {
          selectorz.$or = _.map(
            $or, (exp) => {
              let expz = exp;
              const ref = expz.emails;
              if ((ref != null ? ref.$regex : void 0) != null) {
                expz = {
                  emails: {
                    $elemMatch: {
                      address: expz.emails,
                    },
                  },
                };
              }
              return expz;
            }
          );
        }
        return selectorz;
      },
      tableColumns: [
        {
          name: '_id',
          label: 'Name',
          render(value) {
            const user = users.findOne({ _id: value });

            if (user && user.services && user.services.HMIS && user.services.HMIS.name) {
              return user.services.HMIS.name.trim();
            }

            if (user && user.services && user.services.HMIS
                && user.services.HMIS.firstName && user.services.HMIS.lastName) {
              return (
                `${user.services.HMIS.firstName.trim()} ${user.services.HMIS.lastName.trim()}`
              ).trim();
            }

            if (user && user.emails && user.emails[0].address) {
              return user.emails[0].address.toLowerCase();
            }

            return '';
          },
          searchable: true,
        },
        {
          name: 'emails',
          label: 'Email',
          render(value) {
            // some users have no email addresses
            if (value && value.length) {
              return value[0].address.toLowerCase();
            }
            return '';
          },
          searchable: true,
        },
        {
          name: 'emails',
          label: 'Mail',
          template: 'adminUsersMailBtn',
          width: '40px',
        },
        {
          name: 'createdAt',
          label: 'Joined',
        },
      ],
    },
  },
  googleMaps: {
    apiKey: 'AIzaSyC2dPMYEhEoqnUe8LQZK9SVemORszJ-NgE',
  },
  hmisAPIEndpoints: {
    apiBaseUrl: 'https://www.hmislynk.com',
    oauthBaseUrl: 'https://www.hmislynk.com/hmis-authorization-service/rest',
    authorize: '/authorize/',
    token: '/token/',
    revoke: '/revoke/',
    clientBaseUrl: 'https://www.hmislynk.com/hmis-clientapi/rest',
    clients: '/clients/',
    enrollments: '/clients/{{client_id}}/enrollments',
    enrollmentExits: '/clients/{{client_id}}/enrollments/{{enrollmentId}}/exits',
    searchClient: '/search/client',
    projects: '/projects/',
    userServiceBaseUrl: 'https://www.hmislynk.com/hmis-user-service/rest',
    accounts: '/accounts',
    account: '/accounts/{{accountId}}',
    basicInfo: '/accounts/{{username}}/basicinfo',
    selfBasicInfo: '/accounts/self/basicinfo',
    accountRoles: '/accounts/{{accountId}}/roles',
    accountRole: '/accounts/{{accountId}}/roles/{{roleId}}',
    projectGroups: '/projectgroups',
    userProfiles: '/profiles',
    roles: '/roles',
    housingInventoryBaseUrl: 'https://www.hmislynk.com/inventory-api/rest',
    housingUnits: '/housing-units',
    housingUnit: '/housing-units/{{housing_unit_uuid}}',
    globalHouseholdBaseUrl: 'https://www.hmislynk.com/global-household-api',
    globalHouseholds: '/global-households',
    globalHousehold: '/global-households/{{global_household_uuid}}',
    globalHouseholdMembers: '/global-households/{{global_household_uuid}}/members',
    v2015: '/v2015',
    v2014: '/v2014',
    surveyServiceBaseUrl: 'https://www.hmislynk.com/survey-api/rest',
    sectionScores: '/clients/{{client_id}}/surveys/{{survey_id}}/scores',
    sectionScore: '/clients/{{client_id}}/surveys/{{survey_id}}/sections/{{section_id}}/scores',
    surveyServiceQuestions: '/questiongroups/{{questiongroupid}}/questions',
    surveyServiceQuestion: '/questiongroups/{{questiongroupid}}/questions/{{questionid}}',
    pickListGroups: '/picklistgroups',
    pickListGroup: '/picklistgroups/{{picklistgroupid}}',
    pickListValues: '/picklistgroups/{{picklistgroupid}}/picklistvalues',
    pickListValue: '/picklistgroups/{{picklistgroupid}}/picklistvalues/{{picklistvalueid}}',
    surveys: '/surveys',
    survey: '/surveys/{{surveyid}}',
    surveySections: '/surveys/{{surveyid}}/surveysections',
    surveySection: '/surveys/{{surveyid}}/surveysections/{{sectionid}}',
    surveyQuestions: '/surveys/{{surveyid}}/surveysections/{{sectionid}}/questions',
    surveyQuestion: '/surveys/{{surveyid}}/surveysections/{{sectionid}}/questions/{{questionid}}',
  },
};
