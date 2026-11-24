/* ============================
   SHRIRAM TECHNOLOGIES — JS
   ============================ */

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) navLinks.classList.remove('open');
    });
}

// ---- Cursor glow ----
const glow = document.getElementById('cursorGlow');
if (glow) {
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ---- Particle canvas ----
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            o: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.o})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        animFrame = requestAnimationFrame(draw);
    }
    draw();
}

initParticles('particleCanvas');

// ---- Typed text ----
const typedEl = document.getElementById('typedText');
if (typedEl) {
    const words = ['Future of Automation', 'World of Robotics', 'Power of AI', 'Era of Innovation'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
        const word = words[wi];
        if (!deleting) {
            typedEl.textContent = word.slice(0, ci + 1);
            ci++;
            if (ci === word.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            typedEl.textContent = word.slice(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                wi = (wi + 1) % words.length;
            }
        }
        setTimeout(type, deleting ? 55 : 90);
    }
    type();
}

// ---- Counter animation ----
function animateCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.nextElementSibling?.textContent || '';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Trigger counters when stats come into view
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsEl);
}

// ---- Contact form ----
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            form.reset();
            btn.innerHTML = 'Send Message <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
            btn.disabled = false;
            const success = document.getElementById('formSuccess');
            success.style.display = 'block';
            success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => success.style.display = 'none', 6000);
        }, 1400);
    });

    /* ==========================================================
   GET A QUOTE MODAL — JAVASCRIPT
   Add this inside a <script> tag at the bottom of base.html
   (after the modal HTML, just before </body>)
=========================================================== */

(function() {
    const overlay    = document.getElementById('quoteModal');
    const modalBox   = document.getElementById('modalBox');
    const closeBtn   = document.getElementById('closeModal');
    let   qStep      = 1;

    /* ---- Open / Close ---- */
    function qOpen() {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function qClose() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    window.qClose = qClose;

    /* Trigger: navbar "Get a Quote" button */
    document.querySelectorAll('[data-quote-trigger]').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            qOpen();
        });
    });

    /* Close on overlay click or Escape */
    overlay.addEventListener('click', e => { if (e.target === overlay) qClose(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') qClose(); });
    if (closeBtn) closeBtn.addEventListener('click', qClose);

    /* ---- Step navigation ---- */
    window.qGoStep = function(n) {
        /* Validate step 1 before moving forward */
        if (qStep === 1 && n === 2) {
            const name  = document.getElementById('q-name').value.trim();
            const email = document.getElementById('q-email').value.trim();
            if (!name)  { alert('Please enter your full name.'); return; }
            if (!email || !/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email address.'); return; }
        }

        /* Hide current step, show next */
        document.getElementById('qstep' + qStep).classList.remove('active');
        document.getElementById('qstep' + n).classList.add('active');

        /* Update steps bar */
        for (let i = 1; i <= 3; i++) {
            const sn = document.getElementById('sn' + i);
            const sl = document.getElementById('sl' + i);
            sn.classList.remove('active', 'done');
            sl.classList.remove('active');
            if (i < n)       { sn.classList.add('done'); sn.textContent = '✓'; }
            else if (i === n) { sn.classList.add('active'); sn.textContent = i; sl.classList.add('active'); }
            else              { sn.textContent = i; }
        }
        const l1 = document.getElementById('line1');
        const l2 = document.getElementById('line2');
        if (l1) l1.classList.toggle('done', n > 1);
        if (l2) l2.classList.toggle('done', n > 2);

        qStep = n;
        if (modalBox) modalBox.scrollTop = 0;
    };

    /* ---- Service checkbox toggle ---- */
    window.qToggleCheck = function(el) {
        el.classList.toggle('checked');
    };

    /* ---- Chip selection (single select per group) ---- */
    window.qSelectChip = function(el, groupId) {
        document.querySelectorAll('#' + groupId + ' .chip-opt').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
    };

    /* ---- Submit ---- */
    window.qSubmit = function() {
        const services = [...document.querySelectorAll('.service-check.checked span')].map(s => s.textContent);
        if (services.length === 0) {
            alert('Please select at least one service.');
            return;
        }

        const name     = document.getElementById('q-name').value.trim();
        const email    = document.getElementById('q-email').value.trim();
        const company  = document.getElementById('q-company').value.trim();
        const phone    = document.getElementById('q-phone').value.trim();
        const location = document.getElementById('q-location').value.trim();
        const desc     = document.getElementById('q-desc').value.trim();
        const budget   = document.querySelector('#budgetChips .selected')?.textContent   || 'Not specified';
        const timeline = document.querySelector('#timelineChips .selected')?.textContent || 'Not specified';
        const source   = document.getElementById('q-source').value;
        const notes    = document.getElementById('q-notes').value.trim();

        /* ---- Send to your Flask route via fetch ---- */
        /*
        fetch('/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, company, phone, location, services, desc, budget, timeline, source, notes })
        });
        */

        /* Show success screen */
        document.getElementById('stepsBar').style.display = 'none';
        document.getElementById('qstep3').classList.remove('active');

        const ss = document.getElementById('qSuccess');
        ss.classList.add('show');

        document.getElementById('qSuccessDetails').innerHTML = `
            <div><strong>Name:</strong> ${name}</div>
            <div><strong>Email:</strong> ${email}</div>
            ${company  ? `<div><strong>Company:</strong> ${company}</div>`   : ''}
            ${phone    ? `<div><strong>Phone:</strong> ${phone}</div>`       : ''}
            ${location ? `<div><strong>Location:</strong> ${location}</div>` : ''}
            <div><strong>Services:</strong> ${services.join(', ')}</div>
            <div><strong>Budget:</strong> ${budget}</div>
            <div><strong>Timeline:</strong> ${timeline}</div>
        `;
    };

})();
}
