const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const emailService = require('../../services/email');
const verifyAuthToken = require('../../services/verifyAuthToken');

// import schemas
const Event = require('../../model/event');
const User = require('../../model/user');

// CREATE
router.post(
  '/events',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res) => {
    User.findById(req.body.owner, (err, owner) => {
      // create new event document
      let newEvent = new Event();

      // find and update user document
      if (err || !owner) {
        return res.status(500).send({
          message: 'Unable to create event: Please try again later',
        });
      }

      owner.ownedEvents.push(newEvent._id);

      // set event properties
      newEvent.owner = req.body.owner;
      newEvent.title = req.body.title;
      newEvent.topic = req.body.topic;
      newEvent.description = req.body.description;
      newEvent.start = req.body.start;
      newEvent.end = req.body.end;
      newEvent.cost = req.body.cost;
      newEvent.address = req.body.address;
      newEvent.images = req.body.images;

      // save the new event
      newEvent.save((eventErr) => {
        if (eventErr) {
          return res.status(500).send({
            message: 'Failed to create event',
          });
        } else {
          // event save successful, so save the user (owner)
          owner.save();

          return res.status(201).send({
            message: 'Event added successfully',
          });
        }
      });
    });
  }
);

// READ
router.get('/events', (req, res) => {
  if (req.query.id) {
    Event.findById(req.query.id, (err, event) => {
      // Error occured finding events
      if (err) {
        return res.status(500).send({
          message: 'Failed to retrieve events',
        });
      }

      // No event with the request ID exists
      if (!event) {
        return res.status(500).send({ message: 'No events found' });
      }

      // Valid request, return event
      return res.status(200).send({ data: event });
    });
  } else {
    Event.find(
      // only get events which haven't started yet
      { start: { $gt: moment() } },
      (err, events) => {
        // Error occured finding events
        if (err) {
          return res.status(500).send({
            message: 'Failed to retrieve events',
          });
        }

        // No events in the database
        if (!events.length) {
          return res.status(500).send({ message: 'No events found' });
        }

        // Valid request, return events
        return res.status(200).send({ data: events });
      }
    );
  }
});

// DELETE
router.delete(
  '/events',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res) => {
    const { eventID, userID } = req.body;

    if (!eventID || !userID) {
      return res.status(400).send({ message: 'Missing event or user ID' });
    }

    Event.findById(eventID, (err, event) => {
      if (err) {
        return res.status(500).send({ message: 'Error deleting event' });
      }

      User.findById(userID, (err, user) => {
        if (err) {
          return res.status(500).send({ message: 'Error deleting event' });
        }

        // delete request must come from an admin or the event's owner
        if (!user._id.equals(event.owner) && user.type !== 1) {
          return res
            .status(403)
            .send({ message: 'You do not have permission to do that' });
        }

        // delete the event
        Event.deleteOne(event, (err) => {
          if (err) {
            return res.status(500).send({ message: 'Error deleting event' });
          }

          // remove the event from the event owners 'ownedEvents' array and subscribers 'subscriptions' array
          const queryEventID = mongoose.Types.ObjectId(eventID);
          User.updateMany(
            {},
            {
              $pull: { ownedEvents: queryEventID, subscriptions: queryEventID },
            },
            (err) => {
              if (err) {
                return res
                  .status(500)
                  .send({ message: 'Error deleting event' });
              }
            }
          );

          const deletedByAdmin = user.type == 1 ? true : false;

          // send notification email to the event owner
          User.findById(event.owner, (err, user) => {
            let ownerEmailText;
            if (deletedByAdmin) {
              ownerEmailText = `This email is to notify you that your event titled '${event.title}' has been deleted by an administrator.\n\nAdministrators remove posts that violate Upvent's posting rules.\n\nPlease contact the admin team if you have any further queries.`;
            } else {
              ownerEmailText = `This email is to notify you that your request to delete your event titled '${event.title}' has been completed successully.\n\nWe have notified the subscribers of this event about its deletion.`;
            }

            const mailOptions = {
              from: 'Upvent ☁️ <accounts@upvent.com>', // 'from' email cannot be customised when using gmail as host
              to: user.email,
              subject: `Event Deleted: '${event.title}'`,
              text: ownerEmailText,
            };

            emailService.send(mailOptions);
          });

          // send notification emails to subscribers
          const subscriberIDs = event.subscribers;

          User.find()
            .where('_id')
            .in(subscriberIDs)
            .exec((err, docs) => {
              docs.forEach((doc) => {
                let subEmailText;
                if (deletedByAdmin) {
                  subEmailText = `This email is to notify you that the event titled: '${event.title}' that you are subscribed to has been deleted by an administrator.\n\nAdministrators remove posts that violate Upvent's posting rules.\n\nPlease contact the admin team if you have any further queries.`;
                } else {
                  subEmailText = `This email is to notify you that the event titled: '${event.title}' that you are subscribed to has been deleted by the host.\n\nPlease contact the host if you have any queries regarding the event's deletion.`;
                }

                const mailOptions = {
                  from: 'Upvent ☁️ <accounts@upvent.com>',
                  to: doc.email,
                  subject: `Subscribed Event Deleted: '${event.title}'`,
                  text: subEmailText,
                };

                emailService.send(mailOptions);
              });
            });

          return res.status(204).send();
        });
      });
    });
  }
);

module.exports = router;
