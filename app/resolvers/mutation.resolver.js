import {
  surveyDatamapper,
  userDatamapper,
  bookDatamapper,
  userHasBookDatamapper,
  commentDatamapper,
  collectionDatamapper,
  collectionShareDatamapper,
  collectionHasBookDatamapper,
} from '../datamappers/index.datamapper.js';
import { unauthorizedError, notFoundError } from '../errors/gql.error.js';

export default {

  async updateUser(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedUser = await userDatamapper.update(input);

    if (!updatedUser)
      throw notFoundError(`Erreur lors de la mise à jour de l'utilisateur.`);

    return updatedUser;

  },

  async deleteUser(_, { id }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedUser = await userDatamapper.delete({
      where: {
        id,
      },
    });

    if (!deletedUser)
      throw notFoundError(`Erreur lors de la suppression de l'utilisateur.`);

    return deletedUser;

  },

  async updateBook(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedBook = await bookDatamapper.update(input);

    if (!updatedBook)
      throw notFoundError(`Erreur lors de la mise à jour du livre.`);
    console.log(updatedBook);

    return updatedBook;
  },

  async deleteBook(_, { id }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedBook = await bookDatamapper.delete({
      where: {
        id,
      },
    });
    if (!deletedBook)
      throw notFoundError(`Erreur lors de la suppression du livre.`);

    return deletedBook;
  },

  async createUserHasBook(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const createdUserHasBook = await userHasBookDatamapper.create(input);

    if (!createdUserHasBook)
      throw notFoundError(`Erreur lors de la création de l'association UserHasBook.`);

    return createdUserHasBook;

  },

  async updateUserHasBook(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedUserHasBook = await userHasBookDatamapper.update(input);

    if (!updatedUserHasBook)
      throw notFoundError(`Erreur lors de la mise à jour de l'association UserHasBook.`);

    return updatedUserHasBook;

  },

  async deleteUserHasBook(_, { bookId, userId }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedUserHasBook = await userHasBookDatamapper.delete({
      where: {
        bookId,
        userId,
      },
    });

    if (!deletedUserHasBook)
      throw notFoundError(`Erreur lors de la suppresion de l'association UserHasBook.`);

    return deletedUserHasBook;

  },

  async createSurvey(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    //* La propriété questionAnswer qui est un objet est automatiquement
    //* transformée en TEXT grâce au SGBD de PostgreSQL
    //* Donc pas besoin de le convertir en JS avant de le passer
    const createdSurvey = await surveyDatamapper.create(input);

    if (!createdSurvey)
      throw notFoundError(`Erreur lors de la création du questionnaire.`);

    return {
      ...createdSurvey,
      questionAnswer: JSON.parse(createdSurvey.questionAnswer),
    };

  },

  async updateSurvey(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    //* La propriété questionAnswer qui est un objet est automatiquement
    //* transformée en TEXT grâce au SGBD de PostgreSQL
    //* Donc pas besoin de le convertir en JS avant de le passer
    const updatedSurvey = await surveyDatamapper.update(input);

    if (!updatedSurvey)
      throw notFoundError(`Erreur lors de la mise à jour du questionnaire.`);

    return {
      ...updatedSurvey,
      questionAnswer: JSON.parse(updatedSurvey.questionAnswer),
    };

  },

  async deleteSurvey(_, { id }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedSurvey = await surveyDatamapper.delete({
      where: {
        id,
      },
    });

    if (!deletedSurvey)
      throw notFoundError(`Erreur lors de la suppresion du questionnaire.`);

    return {
      ...deletedSurvey,
      questionAnswer: JSON.parse(deletedSurvey.questionAnswer),
    };

  },

  async createComment(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const createdComment = await commentDatamapper.create(input);

    if (!createdComment)
      throw notFoundError(`Erreur lors de la création du commentaire.`);

    return createdComment;

  },

  async updateComment(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedComment = await commentDatamapper.update(input);

    if (!updatedComment)
      throw notFoundError(`Erreur lors de la mise à jour du commentaire.`);

    return updatedComment;

  },

  async deleteComment(_, { bookId, userId }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedComment = await commentDatamapper.delete({
      where: {
        bookId,
        userId,
      },
    });

    if (!deletedComment)
      throw notFoundError(`Erreur lors de la suppresion du commentaire.`);

    return deletedComment;

  },

  async createCollection(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const createdCollection = await collectionDatamapper.create(input);

    if (!createdCollection)
      throw notFoundError(`Erreur lors de la création de la collection.`);

    return createdCollection;

  },

  async updateCollection(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedCollection = await collectionDatamapper.update(input);

    if (!updatedCollection)
      throw notFoundError(`Erreur lors de la mise à jour de la collection.`);

    return updatedCollection;

  },

  async deleteCollection(_, { id }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedCollection = await collectionDatamapper.delete({
      where: {
        id,
      },
    });

    if (!deletedCollection)
      throw notFoundError(`Erreur lors de la suppresion de la collection.`);

    return deletedCollection;

  },

  async createCollectionShare(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const createdCollectionShare = await collectionShareDatamapper.create(input);

    if (!createdCollectionShare)
      throw notFoundError(`Erreur lors de la création du partage de la collection.`);

    return createdCollectionShare;

  },

  async updateCollectionShare(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedCollectionShare = await collectionShareDatamapper.update(input);

    if (!updatedCollectionShare)
      throw notFoundError(`Erreur lors de la mise à jour du partage de la collection.`);

    return updatedCollectionShare;

  },

  async deleteCollectionShare(_, { collectionId, userId }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedCollectionShare = await collectionShareDatamapper.delete({
      where: {
        collectionId,
        userId,
      },
    });

    if (!deletedCollectionShare)
      throw notFoundError(`Erreur lors de la suppresion du partage de la collection.`);

    return deletedCollectionShare;

  },

  async createCollectionHasBook(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const createdCollectionHasBook = await collectionHasBookDatamapper.create(input);

    if (!createdCollectionHasBook)
      throw notFoundError(`Erreur lors de la création de l'association entre la collection et le livre.`);

    return createdCollectionHasBook;

  },

  async updateCollectionHasBook(_, { input }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const updatedCollectionHasBook = await collectionHasBookDatamapper.update(input);

    if (!updatedCollectionHasBook)
      throw notFoundError(`Erreur lors de la mise à jour de l'association entre la collection et le livre.`);

    return updatedCollectionHasBook;

  },

  async deleteCollectionHasBook(_, { collectionId, bookId }, { user }) {

    if (!user) throw unauthorizedError('Missing authentication.');

    const deletedCollectionHasBook = await collectionHasBookDatamapper.delete({
      where: {
        collectionId,
        bookId,
      },
    });

    if (!deletedCollectionHasBook)
      throw notFoundError(`Erreur lors de la suppresion de l'association entre la collection et le livre.`);

    return deletedCollectionHasBook;

  },

};
