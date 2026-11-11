/* Customer Satisfaction Survey - page navigation, conditional branching and validation. */
(function () {
  'use strict';

  var TOTAL_PAGES = 6;
  var currentPage = 1;

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function pageEl(n) {
    return qs('[data-testid="page-' + n + '"]');
  }

  function setHidden(el, hidden) {
    if (el) el.hidden = !!hidden;
  }

  function isInsideHidden(el) {
    return !!(el && el.closest('[hidden]'));
  }

  /* ------------------------- value readers ------------------------- */

  function textVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function selectVal(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  function radioVal(name) {
    var el = qs('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  function checkedValues(name) {
    return qsa('input[name="' + name + '"]:checked').map(function (el) {
      return el.value;
    });
  }

  function choiceValue(testid) {
    var el = qs('[data-testid="' + testid + '"] .selected');
    return el ? el.getAttribute('data-value') : '';
  }

  function ratingValue() {
    return choiceValue('q7-rating');
  }

  function npsValue() {
    return choiceValue('q8-nps');
  }

  function rankingOrder(testid) {
    return qsa('[data-testid="' + testid + '"] li').map(function (li) {
      return li.getAttribute('data-value');
    });
  }

  /* ------------------------- validators ------------------------- */

  /*
   * Character-count rules come straight from the design spec (docs/FORM_DESIGN.md) and the
   * assignment sheet: Q1 name 3-100, Q3 company 2-100, and the paragraph answers capped at 1000
   * characters with a sensible minimum so a single character is not accepted as an answer.
   */
  var LENGTH_RULES = {
    name: { min: 3, max: 100 },
    company: { min: 2, max: 100 },
    paragraph: { min: 10, max: 1000 },
  };

  function withinLength(value, rule) {
    return value.length >= rule.min && value.length <= rule.max;
  }

  function isName(value) {
    return withinLength(value, LENGTH_RULES.name);
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value);
  }

  function isPositiveInt(value) {
    return /^\d+$/.test(value) && parseInt(value, 10) >= 1;
  }

  function isDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  function validateQuestion(question) {
    var qid = question.getAttribute('data-qid');
    switch (qid) {
      case 'q1': return isName(textVal('q1-name'));
      case 'q2': return isEmail(textVal('q2-email'));
      case 'q3': return withinLength(textVal('q3-company'), LENGTH_RULES.company);
      case 'q4': return isPositiveInt(textVal('q4-employees'));
      case 'q5': return radioVal('q5') !== '';
      case 'q6': return checkedValues('q6').length > 0;
      case 'q7': return choiceValue('q7-rating') !== '';
      case 'q8': return choiceValue('q8-nps') !== '';
      case 'q9': return withinLength(textVal('q9-likes'), LENGTH_RULES.paragraph);
      case 'q10': return selectVal('q10-best-feature') !== '';
      case 'q11': return isDate(textVal('q11-purchase-date'));
      case 'q9b': return withinLength(textVal('q9b-why-not'), LENGTH_RULES.paragraph);
      case 'q10b': return qsa('[data-testid="q10b-improve"] li').length > 0;
      case 'q11b': return textVal('q11b-contact-time') !== '';
      case 'q12': return radioVal('q12') !== '';
      case 'q12b': return withinLength(textVal('q12b-make-ten'), LENGTH_RULES.paragraph);
      case 'q12c': return true;
      case 'q12d': return withinLength(textVal('q12d-issue'), LENGTH_RULES.paragraph);
      case 'q13': return selectVal('q13-contact-method') !== '';
      case 'q14': return true;
      case 'q15': return radioVal('q15') !== '';
      case 'q16': return true;
      case 'q17': return radioVal('q17') !== '';
      default: return true;
    }
  }

  function setError(question, failed) {
    var err = qs('.error', question);
    if (err) setHidden(err, !failed);

    var field = qs('input, textarea, select', question);
    if (field) {
      if (failed) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    }
  }

  function clearError(question) {
    setError(question, false);
  }

  function validatePage(n) {
    var section = pageEl(n);
    if (!section) return true;
    var valid = true;
    qsa('.question', section).forEach(function (question) {
      if (isInsideHidden(question)) return;
      var ok = validateQuestion(question);
      setError(question, !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  /* ------------------------- conditional branching ------------------------- */

  function applyConditionals(n) {
    if (n === 3) {
      var rating = parseInt(choiceValue('q7-rating'), 10);
      var positive = !isNaN(rating) && rating >= 4;
      setHidden(qs('[data-testid="branch-positive"]'), !positive);
      setHidden(qs('[data-testid="branch-improvement"]'), positive);
    }

    if (n === 4) {
      var nps = parseInt(choiceValue('q8-nps'), 10);
      var promoter = !isNaN(nps) && nps >= 8;
      var passive = !isNaN(nps) && (nps === 6 || nps === 7);
      var detractor = !isNaN(nps) && nps <= 5;
      setHidden(qs('[data-testid="branch-promoter"]'), !promoter);
      setHidden(qs('[data-testid="branch-passive"]'), !passive);
      setHidden(qs('[data-testid="branch-detractor"]'), !detractor);
    }

    if (n === 5) {
      setHidden(qs('[data-testid="branch-contact"]'), radioVal('q15') !== 'Yes');
    }

    if (n === 6) {
      var caseStudyYes = radioVal('q12') === 'Yes';
      setHidden(qs('[data-testid="thank-you-contact"]'), !caseStudyYes);
      setHidden(qs('[data-testid="thank-you-feedback"]'), caseStudyYes);
      renderSummary();
    }
  }

  /* ------------------------- summary ------------------------- */

  function renderSummary() {
    var rows = [
      ['Name', textVal('q1-name')],
      ['Email', textVal('q2-email')],
      ['Company', textVal('q3-company')],
      ['Employees', textVal('q4-employees')],
      ['Heard about us', radioVal('q5')],
      ['Features', checkedValues('q6').join(', ')],
      ['Overall rating', choiceValue('q7-rating')],
      ['Recommendation (NPS)', choiceValue('q8-nps')],
      ['Liked most', textVal('q9-likes')],
      ['Best feature', selectVal('q10-best-feature')],
      ['Purchase date', textVal('q11-purchase-date')],
      ['Not satisfied because', textVal('q9b-why-not')],
      ['Best contact time', textVal('q11b-contact-time')],
      ['Case study', radioVal('q12')],
      ['Would make it a 10', textVal('q12b-make-ten')],
      ['Issue details', textVal('q12d-issue')],
      ['Preferred contact', selectVal('q13-contact-method')],
      ['Follow-up', radioVal('q15')],
      ['Communication ranking', qsa('[data-testid="q16-rank-channels"] li').map(function (li) { return li.getAttribute('data-value'); }).join(' > ')],
      ['Product meets needs', radioVal('q17')]
    ];

    var list = qs('[data-testid="thank-you-summary"]');
    if (!list) return;
    list.innerHTML = '';
    rows.forEach(function (row) {
      if (row[1] === '' || row[1] === null || typeof row[1] === 'undefined') return;
      var li = document.createElement('li');
      var label = document.createElement('strong');
      label.textContent = row[0] + ': ';
      li.appendChild(label);
      li.appendChild(document.createTextNode(String(row[1])));
      list.appendChild(li);
    });

    var name = textVal('q1-name');
    var greeting = qs('[data-testid="thank-you-message"]');
    if (greeting) {
      greeting.textContent = name ? 'Thank you, ' + name + '!' : 'Thank you for your feedback.';
    }
  }

  /* ------------------------- navigation ------------------------- */

  function updateChrome() {
    var progressText = qs('[data-testid="progress-text"]');
    if (progressText) progressText.textContent = 'Page ' + currentPage + ' of ' + TOTAL_PAGES;

    var bar = qs('[data-testid="progress-bar"]');
    if (bar) bar.style.width = Math.round((currentPage / TOTAL_PAGES) * 100) + '%';

    setHidden(qs('[data-testid="btn-back"]'), currentPage <= 1);
    setHidden(qs('[data-testid="btn-next"]'), currentPage >= TOTAL_PAGES);
    setHidden(qs('[data-testid="btn-submit"]'), currentPage !== TOTAL_PAGES);

    document.body.setAttribute('data-current-page', String(currentPage));
  }

  function showPage(n) {
    currentPage = Math.min(Math.max(n, 1), TOTAL_PAGES);
    qsa('.page').forEach(function (section) {
      var num = parseInt(section.getAttribute('data-page'), 10);
      var active = num === currentPage;
      section.hidden = !active;
      section.classList.toggle('active', active);
    });
    applyConditionals(currentPage);
    updateChrome();
    if (window.scrollTo) window.scrollTo(0, 0);
  }

  function goNext() {
    if (!validatePage(currentPage)) return;
    showPage(currentPage + 1);
  }

  function goBack() {
    showPage(currentPage - 1);
  }

  function submitForm() {
    if (!validatePage(currentPage)) return;
    var submitBtn = qs('[data-testid="btn-submit"]');
    if (submitBtn) submitBtn.disabled = true;
    document.body.setAttribute('data-submitted', 'true');
    var status = qs('[data-testid="status-message"]');
    if (status) {
      status.textContent = 'Your response has been recorded. Thank you!';
      status.hidden = false;
    }
  }

  /* ------------------------- interactions ------------------------- */

  function wireChoiceGroup(testid, buttonSelector, onChange) {
    var group = qs('[data-testid="' + testid + '"]');
    if (!group) return;
    group.addEventListener('click', function (event) {
      var button = event.target.closest(buttonSelector);
      if (!button || !group.contains(button)) return;
      qsa(buttonSelector, group).forEach(function (item) {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      var question = group.closest('.question');
      if (question) clearError(question);
      if (onChange) onChange();
    });
  }

  function wireRanking(list) {
    list.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-move]');
      if (!button) return;
      var item = button.closest('li');
      if (!item) return;
      var move = button.getAttribute('data-move');
      if (move === 'up' && item.previousElementSibling) {
        list.insertBefore(item, item.previousElementSibling);
      } else if (move === 'down' && item.nextElementSibling) {
        list.insertBefore(item.nextElementSibling, item);
      }
    });
  }

  function wireFileValidation() {
    var input = qs('[data-testid="q12c-upload"]');
    if (!input) return;
    input.addEventListener('change', function () {
      var error = qs('[data-testid="error-q12c"]');
      if (error) error.hidden = true;
      if (!input.files || !input.files.length) return;
      var file = input.files[0];
      var allowedType = /\.(png|jpe?g|gif|pdf)$/i.test(file.name) || /^image\//.test(file.type) || file.type === 'application/pdf';
      var allowedSize = file.size <= 10 * 1024 * 1024;
      if (!allowedType || !allowedSize) {
        if (error) error.hidden = false;
        input.value = '';
      }
    });
  }

  function init() {
    var nextBtn = qs('[data-testid="btn-next"]');
    var backBtn = qs('[data-testid="btn-back"]');
    var submitBtn = qs('[data-testid="btn-submit"]');

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (backBtn) backBtn.addEventListener('click', goBack);
    if (submitBtn) submitBtn.addEventListener('click', submitForm);

    wireChoiceGroup('q7-rating', 'button', function () {
      if (currentPage === 3) applyConditionals(3);
    });
    wireChoiceGroup('q8-nps', 'button', function () {
      if (currentPage === 4) applyConditionals(4);
    });

    qsa('.ranking').forEach(wireRanking);
    wireFileValidation();

    // The generic "clear the error as soon as the answer changes" rule must skip the file
    // input: wireFileValidation owns that question's message and shows it on the same change
    // event, so clearing here would wipe the file error the moment it is raised (DEF-015).
    document.addEventListener('input', function (event) {
      var question = event.target.closest('.question');
      if (question && event.target.type !== 'file') clearError(question);
    });

    document.addEventListener('change', function (event) {
      var question = event.target.closest('.question');
      if (question && event.target.type !== 'file') clearError(question);
      if (currentPage === 5 && event.target.name === 'q15') applyConditionals(5);
    });

    showPage(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
