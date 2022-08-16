const express = require('express');
const router = express.Router();

const { formatDistanceToNow } = require('date-fns');

const formattedDateFromNow = (date) =>
  formatDistanceToNow(date, { addSuffix: true });

const messages = [
  {
    text: 'Who killed Captain Alex?',
    user: 'Marco',
    added: new Date(),
  },
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Mini Messageboard',
    messages: messages.map((message) => {
      return {
        ...message,
        fromNow: formattedDateFromNow(message.added),
      };
    }),
  });
});

router.post('/new', (req, res, next) => {
  const { name, text } = req.body;

  messages.push({
    text,
    user: name,
    added: new Date(),
  });

  res.redirect('/');
});

module.exports = router;
