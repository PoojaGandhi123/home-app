/**
 * Created by udit on 26/07/16.
 */

Meteor.methods(
  {
    addQuestion(category, name, question, dataType, options, qtype, audience, locked, allowSkip, isCopy) {
      const questionCollection = HomeUtils.adminCollectionObject('questions');
      questionCollection.insert(
        {
          category,
          name,
          question,
          options,
          dataType,
          qtype,
          audience,
          locked,
          allowSkip,
          isCopy,
        }
      );
    },
    updateQuestion(
      questionID,
      category,
      name,
      question,
      dataType,
      options,
      qtype,
      audience,
      locked,
      allowSkip,
      isCopy
    ) {
      const questionCollection = HomeUtils.adminCollectionObject('questions');
      questionCollection.update(
        questionID, {
          $set: {
            category,
            name,
            question,
            options,
            dataType,
            qtype,
            audience,
            locked,
            allowSkip,
            isCopy,
          },
        }
      );
    },
    removeQuestion(questionID) {
      const questionCollection = HomeUtils.adminCollectionObject('questions');
      questionCollection.remove({ _id: questionID });
    },
  }
);
