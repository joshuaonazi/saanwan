// ==========================================================================
// SAANWAN CONSULTING — Site script
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is tapped (mobile)
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Build hero equalizer bars (10 bars) so markup stays light ---- */
  var eq = document.querySelector('.eq-visual');
  if (eq && eq.children.length === 0) {
    for (var i = 0; i < 10; i++) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      eq.appendChild(bar);
    }
  }

  /* ---- Contact form validation ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var fields = [
        { id: 'name', check: function (v) { return v.trim().length > 1; }, msg: 'Please enter your name.' },
        { id: 'email', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'Please enter a valid email address.' },
        { id: 'service', check: function (v) { return v !== ''; }, msg: 'Please select a service.' },
        { id: 'message', check: function (v) { return v.trim().length > 9; }, msg: 'Tell us a little more — at least a sentence or two.' }
      ];

      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        var group = input.closest('.form-group');
        var errorEl = group.querySelector('.form-error');

        if (!field.check(input.value)) {
          group.classList.add('invalid');
          if (errorEl) errorEl.textContent = field.msg;
          valid = false;
        } else {
          group.classList.remove('invalid');
        }
      });

      if (valid) {
        // NOTE: There is no backend wired up yet. This just confirms the
        // form works client-side. Replace this block with a real submit
        // (fetch() to your form endpoint, or a service like Formspree)
        // once you're ready to receive messages.
        status.textContent = "Thanks — your message looks good. Connect a form handler (see script.js) to start receiving these.";
        status.classList.add('show', 'success');
        form.reset();
      } else {
        status.classList.remove('show', 'success');
      }
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header scroll styling ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      var currentScrollY = window.pageYOffset;
      if (currentScrollY > 0) {
        header.classList.add('site-header--scroll-up');
      } else {
        header.classList.remove('site-header--scroll-up');
      }
    }, { passive: true });
  }

});
