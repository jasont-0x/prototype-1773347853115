const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/contact-type', function (req, res) {
  res.render('contact-type')
})

router.post('/contact-type', function (req, res) {
  const answer = req.session.data['contact-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-type': 'Select what type of contact you had' }
    return res.render('contact-type')
  }
  if (answer === 'i-saw-them-but-did-not-interact') {
    return res.redirect('/ineligible-contact-type')
  }
  res.redirect('/contact-date')
})

router.get('/ineligible-contact-type', function (req, res) {
  res.render('ineligible-contact-type')
})

router.get('/contact-date', function (req, res) {
  res.render('contact-date')
})

router.post('/contact-date', function (req, res) {
  const answer = req.session.data['contact-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-date': 'Enter when the contact happened' }
    return res.render('contact-date')
  }
  res.redirect('/contact-location')
})

router.get('/contact-location', function (req, res) {
  res.render('contact-location')
})

router.post('/contact-location', function (req, res) {
  const answer = req.session.data['contact-location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-location': 'Enter where the contact happened' }
    return res.render('contact-location')
  }
  res.redirect('/alien-description')
})

router.get('/alien-description', function (req, res) {
  res.render('alien-description')
})

router.post('/alien-description', function (req, res) {
  const answer = req.session.data['alien-description']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'alien-description': 'Enter a description of the aliens' }
    return res.render('alien-description')
  }
  res.redirect('/has-evidence')
})

router.get('/has-evidence', function (req, res) {
  res.render('has-evidence')
})

router.post('/has-evidence', function (req, res) {
  const answer = req.session.data['has-evidence']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'has-evidence': 'Select yes if you have evidence' }
    return res.render('has-evidence')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('AC')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
