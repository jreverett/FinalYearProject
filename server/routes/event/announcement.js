const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const emailService = require('../../services/email');

// import event schema
const Event = require('../../model/event');
const User = require('../../model/user');

router.post('/announcement', (req, res, next) => {
  // 1. find event
  Event.findById(req.body.eventID, (err, event) => {
    if (err) {
      return res
        .status(500)
        .send({ message: 'Could not send announcement: ' + err });
    }

    if (!event) {
      return res
        .status(400)
        .send({ message: 'Could not find the requested event' });
    }

    if (req.body.scheduleSendDateTime === 'Invalid date') {
      return res.status(400).send({
        message:
          'Invalid date: Submit either a valid date or choose immediate send'
      });
    }

    User.findById(req.body.userID, (err, user) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'Could not send announcement: ' + err });
      }

      if (!user) {
        return res
          .status(400)
          .send({ message: 'Could not find the requested user' });
      }

      // 2. verify requester is event owner
      if (event.owner !== user.id) {
        return res
          .status(403)
          .send({ message: 'Only the event owner can send announcements' });
      }

      // 3. get subscribers as user objects
      let subscriberIDs = event.subscribers;
      req.body.requestCopy ? subscriberIDs.push(user.email) : null;
      User.find()
        .where('_id')
        .in(subscriberIDs)
        .exec((err, docs) => {
          // check for errors
          if (err) {
            return res
              .status(500)
              .send({ message: 'Could not send announcement: ' + err });
          }

          // 4. for each subscriber of the event...
          docs.forEach(doc => {
            // 4.1 check consent
            if (!doc.emailConsent) return;

            const mailOptions = {
              from: 'Upvent ☁️ <accounts@upvent.com>', // 'from' email cannot be customised when using gmail as host
              to: doc.email,
              subject: req.body.subject,
              text: req.body.body
            };

            if (!req.body.scheduleSendDateTime) {
              // 4.2 immediate send: send email content now
              emailService.send(mailOptions);
            } else {
              // 4.3 scheduled send: setup cron job
              schedule.scheduleJob(req.body.scheduleSendDateTime, () => {
                emailService.send(mailOptions);
              });
            }
          });

          return res
            .status(200)
            .send({ message: 'Announcement request successful' });
        });
    });
  });
});

module.exports = router;
