/**
 * Created by udit on 20/06/16.
 */

Meteor.methods(
  {
    addClient(
      firstName,
      middleName,
      lastName,
      suffix,
      photo,
      ssn,
      dob,
      race,
      ethnicity,
      gender,
      veteranStatus,
      disablingConditions,
      residencePrior,
      entryDate,
      exitDate,
      destination,
      relationship,
      location,
      shelter,
      signature
    ) {
      const client = clients.insert(
        {
          firstName,
          middleName,
          lastName,
          suffix,
          photo,
          ssn,
          dob,
          race,
          ethnicity,
          gender,
          veteranStatus,
          disablingConditions,
          residencePrior,
          entryDate,
          exitDate,
          destination,
          relationship,
          location,
          shelter,
          signature,
        }
      );
      return client;
    },
    updateClient(
      clientID,
      firstName,
      middleName,
      lastName,
      suffix,
      photo,
      ssn,
      dob,
      race,
      ethnicity,
      gender,
      veteranStatus,
      disablingConditions,
      residencePrior,
      entryDate,
      exitDate,
      destination,
      relationship,
      location,
      shelter
    ) {
      clients.update(
        clientID, {
          $set: {
            firstName,
            middleName,
            lastName,
            suffix,
            photo,
            ssn,
            dob,
            race,
            ethnicity,
            gender,
            veteranStatus,
            disablingConditions,
            residencePrior,
            entryDate,
            exitDate,
            destination,
            relationship,
            location,
            shelter,
          },
        }
      );
    },
    removeClient(clientID) {
      clients.remove({ _id: clientID });
    },
    addClientToHMIS(clientID) {
      const client = clients.findOne({ _id: clientID });

      const personalId = HMISAPI.createClient(client);

      let flag = false;

      if (personalId) {
        clients.remove({ _id: client._id });
        const clientBasePath = HomeConfig.hmisAPIEndpoints.clientBaseUrl.replace(
          HomeConfig.hmisAPIEndpoints.apiBaseUrl,
          ''
        );
        const schemaVersion = HomeConfig.hmisAPIEndpoints.v2015;
        const clientsPath = HomeConfig.hmisAPIEndpoints.clients;
        const url = `${clientBasePath}${schemaVersion}${clientsPath}/${personalId}`;
        flag = {
          _id: personalId,
          link: url,
        };
      }
      return flag;
    },
    getHMISClient(clientId, schema) {
      const client = HMISAPI.getClient(clientId, schema);
      const enrollments = HMISAPI.getEnrollments(clientId, schema);

      for (let i = 0; i < enrollments.length; i++) {
        enrollments[i].exits = HMISAPI.getEnrollmentExits(
          clientId,
          enrollments[i].enrollmentId,
          schema
        );

        if (enrollments[i].exits.length > 0) {
          enrollments[i].exits = enrollments[i].exits[0];
        } else {
          enrollments[i].exits = false;
        }
      }

      for (let i = 0; i < enrollments.length; i++) {
        HMISAPI.setCurrentUserId(Meteor.userId());
        enrollments[i].project = HMISAPI.getProject(enrollments[i].projectid, schema);
      }

      client.enrollments = enrollments;
      return client;
    },
    getEnrollments(clientId, schema) {
      const enrollments = HMISAPI.getEnrollments(clientId, schema);
      return enrollments;
    },
  }
);
