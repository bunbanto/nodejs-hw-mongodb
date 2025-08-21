import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';
import { Types } from 'mongoose';

export const checkPermission = async (req, res, next) => {
  const { contactId } = req.params;

  if (!Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: req.user._id,
  });

  if (!contact) {
    return next(createHttpError(404, 'Contact not found or access denied'));
  }

  req.contact = contact;
  next();
};
