// YRB Nova homepage: hero scenes, business picker, drag gallery, hover previews, reactive marquee.
// Runs after fx.js (shared reveals, cursor, smooth scroll, single animation loop via YN.onFrame).
(function () {
    'use strict';

    var YN = window.YN || { motion: false, fine: false, onFrame: function () {}, scrollTo: function (y) { window.scrollTo(0, y); } };
    var root = document.documentElement;
    var motion = YN.motion, fine = YN.fine;
    var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    var ramp = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
    var smooth = function (t) { return t * t * (3 - 2 * t); };
    var vh = function () { return YN.vh || window.innerHeight; };
    var vw = function () { return YN.vw || window.innerWidth; };
    var pageY = function (el) { return el.getBoundingClientRect().top + window.scrollY; };

    // Intro loader is pure CSS; tidy it away once it has played
    var loader = document.querySelector('.ix-loader');
    if (loader) setTimeout(function () { root.classList.remove('ix-intro'); loader.remove(); }, 1300);

    // =====================================================================
    // Hero: three scenes over the photo slideshow
    // =====================================================================
    var hero = document.querySelector('.ix-hero');
    var heroMedia = hero && hero.querySelector('.ix-hero-media');
    var slideshow = hero && hero.querySelector('.hero-slideshow');
    var pin = hero && hero.querySelector('.ix-hero-pin');
    var scenes = hero ? hero.querySelectorAll('.ix-scene') : [];
    var words = hero ? hero.querySelectorAll('.ix-word span') : [];
    var cue = hero && hero.querySelector('.ix-cue');
    var chapters = hero ? hero.querySelectorAll('.ix-chapters button') : [];
    // [fade in from, fade in to, fade out from, fade out to] in hero progress (0..1)
    var WINDOWS = [[-1, 0, 0.14, 0.27], [0.25, 0.38, 0.6, 0.7], [0.68, 0.8, 2, 2]];
    var TARGETS = [0, 0.49, 0.9];
    var heroP = 0, mx = 0, my = 0, tmx = 0, tmy = 0;

    function heroScrollFor(p) {
        var total = hero.offsetHeight - vh();
        return pageY(hero) + p * total + 2;
    }
    chapters.forEach(function (b, i) {
        b.addEventListener('click', function () { YN.scrollTo(heroScrollFor(TARGETS[i])); });
    });
    if (cue) cue.addEventListener('click', function () { YN.scrollTo(heroScrollFor(TARGETS[1])); });

    if (pin && fine && motion) {
        pin.addEventListener('pointermove', function (e) {
            tmx = e.clientX / vw() - 0.5; tmy = e.clientY / vh() - 0.5;
            pin.style.setProperty('--hx', e.clientX + 'px');
            pin.style.setProperty('--hy', e.clientY + 'px');
        }, { passive: true });
    }

    function heroUpdate() {
        var r = hero.getBoundingClientRect();
        var total = Math.max(1, r.height - vh());
        heroP = clamp(-r.top / total, 0, 1);
        var mobile = vw() < 860;
        var active = 0, best = -1;
        for (var i = 0; i < scenes.length; i++) {
            var w = WINDOWS[i];
            var inT = ramp(heroP, w[0], w[1]), outT = ramp(heroP, w[2], w[3]);
            var a = smooth(inT) * (1 - smooth(outT));
            var s = scenes[i].style;
            s.opacity = a.toFixed(3);
            s.transform = 'translate3d(0,' + ((1 - inT) * 60 - outT * 60).toFixed(1) + 'px,0) scale(' + (1 + outT * 0.06 - (1 - inT) * 0.03).toFixed(4) + ')';
            s.filter = mobile ? '' : 'blur(' + ((1 - a) * 12).toFixed(1) + 'px)';
            s.visibility = a < 0.02 ? 'hidden' : 'visible';
            if (a > best) { best = a; active = i; }
        }
        chapters.forEach(function (b, i) {
            b.classList.toggle('is-active', i === active);
            if (i === active) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
            var w = WINDOWS[i];
            var fill = i < active ? 1 : (i === active ? ramp(heroP, Math.max(0, w[1]), w[2] > 1 ? 1 : w[2]) : 0);
            b.style.setProperty('--f', fill.toFixed(3));
        });
        var sp = ramp(heroP, 0.26, 0.72);
        if (words.length === 2) {
            words[0].style.transform = mobile ? 'translate3d(0,' + (-sp * 5) + 'vh,0)' : 'translate3d(' + (-sp * 6) + 'vw,0,0)';
            words[1].style.transform = mobile ? 'translate3d(0,' + (sp * 5) + 'vh,0)' : 'translate3d(' + (sp * 6) + 'vw,0,0)';
        }
        if (heroMedia) heroMedia.style.transform = 'scale(' + (1 + heroP * 0.1).toFixed(4) + ')';
        if (cue) cue.style.opacity = (1 - ramp(heroP, 0, 0.06)).toFixed(3);
    }

    // =====================================================================
    // "What does your business do?" picker
    // =====================================================================
    var PICKS = [
        { img: 'portfolio/elite-electric.webp', title: 'Elite Electric', url: 'eliteelectric.co.uk', text: 'Services up front, trust badges and a quote form that turns searches into booked jobs.', demo: 'demos/elite-electric/index.html', more: 'websites-for-electricians.html', moreLabel: 'Websites for electricians' },
        { img: 'portfolio/eliteflow.webp', title: 'EliteFlow Plumbing', url: 'eliteflow.co.uk', text: 'Emergency call buttons, service areas and booking, built to get the phone ringing.', demo: 'demos/new-plumber/index.html', more: 'websites-for-plumbers.html', moreLabel: 'Websites for plumbers' },
        { img: 'portfolio/blade-crown.webp', title: 'Blade & Crown Barbers', url: 'bladeandcrown.co.uk', text: 'Price list, barber profiles and online booking that keeps every chair full.', demo: 'demos/blade-crown/index.html', more: 'websites-for-barbers.html', moreLabel: 'Websites for barbers' },
        { img: 'portfolio/brightside-cleaning.webp', title: 'Brightside Cleaning Co.', url: 'brightsidecleaning.co.uk', text: 'Clear packages and an instant quote form that wins new regular customers.', demo: 'demos/brightside-cleaning/index.html', more: 'websites-for-cleaners.html', moreLabel: 'Websites for cleaners' },
        { img: 'portfolio/ember-oak.webp', title: 'Ember & Oak', url: 'emberandoak.co.uk', text: 'Phone-friendly menus, opening hours and a reservation flow that fills tables.', demo: 'demos/ember-oak/index.html', more: 'websites-for-restaurants.html', moreLabel: 'Websites for restaurants' },
        { img: 'portfolio/corbel-build.webp', title: 'Corbel Build Co.', url: 'corbelbuild.co.uk', text: 'Before-and-after projects and a five-step quote form for a building firm.', demo: 'demos/corbel-build/index.html', more: 'work.html#corbel-build', moreLabel: 'Read the case study' },
        { img: 'portfolio/forge-fitness.webp', title: 'Forge Fitness', url: 'forgefitness.co.uk', text: 'Class timetable, trainer profiles and membership sign-up for a gym.', demo: 'demos/forge-fitness/index.html', more: 'work.html#forge-fitness', moreLabel: 'Read the case study' },
        { img: 'portfolio/anaya-fashion-nest.webp', title: 'Anaya Fashion Nest', url: 'anayafashion.com', text: 'A boutique shop with a product grid and a smooth path from browsing to buying.', demo: 'demos/anaya-clothing/index.html', more: 'work.html#anaya', moreLabel: 'Read the case study' }
    ];
    var picker = document.querySelector('.ix-picker');
    if (picker) {
        var chips = picker.querySelectorAll('.ix-chip');
        var screen = picker.querySelector('.ix-browser-screen');
        var info = picker.querySelector('.ix-preview-info');
        var pTitle = picker.querySelector('.ix-preview-title');
        var pText = picker.querySelector('.ix-preview-text');
        var pUrl = picker.querySelector('.ix-browser-url');
        var pDemo = picker.querySelector('.ix-preview-demo');
        var pMore = picker.querySelector('.ix-preview-more');
        var current = 0, auto = true, autoTimer = 0, pickerVisible = false, AUTO_MS = 4200;
        PICKS.forEach(function (p) { var im = new Image(); im.src = p.img; });

        var choose = function (i, fromUser) {
            if (fromUser) { auto = false; picker.classList.remove('is-auto'); }
            if (i === current) return;
            current = i;
            var p = PICKS[i];
            chips.forEach(function (c, k) { c.classList.toggle('is-active', k === i); c.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
            var img = document.createElement('img');
            img.src = p.img; img.alt = p.title + ' demo website homepage'; img.width = 960; img.height = 486; img.className = 'is-entering';
            screen.appendChild(img);
            requestAnimationFrame(function () { requestAnimationFrame(function () { img.classList.remove('is-entering'); }); });
            Array.prototype.slice.call(screen.querySelectorAll('img')).slice(0, -1).forEach(function (old) {
                old.classList.add('is-leaving'); setTimeout(function () { old.remove(); }, 700);
            });
            info.classList.remove('is-swap'); void info.offsetWidth; info.classList.add('is-swap');
            pTitle.textContent = p.title; pText.textContent = p.text; pUrl.textContent = p.url;
            pDemo.href = p.demo; pMore.href = p.more; picker.querySelector('.ix-browser').href = p.demo; pMore.textContent = p.moreLabel + ' →';
            autoTimer = 0;
        };
        chips.forEach(function (c, i) { c.addEventListener('click', function () { choose(i, true); }); });
        picker.querySelector('.ix-chips').addEventListener('keydown', function (e) {
            var k = e.key, n = chips.length;
            if (k !== 'ArrowRight' && k !== 'ArrowLeft' && k !== 'ArrowDown' && k !== 'ArrowUp') return;
            e.preventDefault();
            var nx = (current + ((k === 'ArrowRight' || k === 'ArrowDown') ? 1 : -1) + n) % n;
            choose(nx, true); chips[nx].focus();
        });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (es) { pickerVisible = es[0].isIntersecting; }, { threshold: 0.35 }).observe(picker);
        }
        if (motion) picker.classList.add('is-auto');
        var lastT = 0;
        YN.onFrame(function (t) {
            var dt = lastT ? Math.min(64, t - lastT) : 0; lastT = t;
            if (!auto || !motion || !pickerVisible || document.hidden || picker.matches(':hover')) return;
            autoTimer += dt;
            picker.style.setProperty('--auto', clamp(autoTimer / AUTO_MS, 0, 1).toFixed(3));
            if (autoTimer >= AUTO_MS) choose((current + 1) % PICKS.length, false);
        });
    }

    // =====================================================================
    // Live work: a 3D ring that spins with scroll (and drag), then lays flat.
    // Phones / reduced motion: a simple swipe carousel with arrows.
    // =====================================================================
    var gal = document.querySelector('.ix-orbit');
    var track = gal && gal.querySelector('.ix-track');
    if (track) {
        var cards = Array.prototype.slice.call(track.querySelectorAll('.live-card'));
        var head = gal.querySelector('.ix-hscroll-head');
        var hint = gal.querySelector('.ix-orbit-hint');
        var bar = gal.querySelector('.ix-hscroll-count .ix-chapter-bar');
        var countNow = gal.querySelector('.ix-hscroll-count span');
        var prev = gal.querySelector('[data-dir="-1"]'), next = gal.querySelector('[data-dir="1"]');
        var orbit = false, cardW = 0, cardH = 0, R = 0, fit = 1, oP = 0;
        var spin = 0, spinVel = 0, dragging = false, moved = 0, lastX = 0, startX = 0, startL = 0, oLast = 0, frozen = false;
        var N = cards.length, STEP = 360 / N;
        var lerp = function (a, b, t) { return a + (b - a) * t; };
        var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

        var layout = function () {
            var want = motion && vw() >= 1000 && vh() >= 680;
            if (want !== orbit) {
                orbit = want;
                gal.classList.toggle('is-orbit', orbit);
                cards.forEach(function (c) { c.style.transform = ''; c.style.opacity = ''; c.style.zIndex = ''; });
                track.style.height = ''; gal.style.height = '';
            }
            if (!orbit) { updateBar(); return; }
            // Short screens get compact cards (no description) so the grid stays big enough to read
            gal.classList.toggle('is-compact', vh() < 860);
            cardW = Math.min(400, (Math.min(vw(), 1260) - 48 - 56) / 3);
            cards.forEach(function (c) { c.style.width = cardW + 'px'; });
            cardH = Math.max.apply(null, cards.map(function (c) { return c.offsetHeight; }));
            R = Math.round((cardW + 40) / (2 * Math.tan(Math.PI / N)) * 1.35);
            // The menu bar tucks away while scrolling down, so the grid can use that space
            // When flat, the heading fades and the grid gets the whole screen
            var gridH = cardH * 2 + 28;
            var gridW = cardW * 3 + 56;
            fit = clamp(Math.min((vh() - 48) / gridH, (vw() - 80) / gridW), 0.6, 1);
            track.style.height = Math.max(cardH + 80, gridH * fit + 20) + 'px';
            gal.style.height = (vh() * 3.2) + 'px';
            YN.dirty = true;
        };

        var render = function () {
            var r = gal.getBoundingClientRect();
            oP = clamp(-r.top / Math.max(1, r.height - vh()), 0, 1);
            var ringP = ramp(oP, 0, 0.5), t = ease(ramp(oP, 0.5, 0.8));
            if (t > 0 && !frozen) frozen = true;
            if (t === 0) frozen = false;
            var rot = -ringP * 300 + spin;
            var tilt = lerp(-16, 0, t);
            var tr = track.getBoundingClientRect(), pr = track.parentNode.getBoundingClientRect();
            var centerShift = vh() / 2 - ((tr.top - pr.top) + tr.height / 2);
            head.style.opacity = (1 - ramp(t, 0.1, 0.7)).toFixed(3);
            head.style.transform = 'translateY(' + (-40 * t).toFixed(1) + 'px)';
            head.style.pointerEvents = t > 0.5 ? 'none' : '';
            track.style.transform = 'rotateX(' + tilt.toFixed(2) + 'deg)';
            cards.forEach(function (c, i) {
                var th = i * STEP + rot;
                var thn = ((th % 360) + 540) % 360 - 180;
                var rad = thn * Math.PI / 180;
                var xr = R * Math.sin(rad), zr = R * Math.cos(rad) - R;
                var col = i % 3, row = Math.floor(i / 3);
                var xg = (col - 1) * (cardW + 28) * fit, yg = (row - 0.5) * (cardH + 28) * fit;
                var x = lerp(xr, xg, t), y = lerp(-40, yg + centerShift, t), z = lerp(zr, 0, t), ry = lerp(thn, 0, t), sc = lerp(0.9, fit, t);
                var face = (Math.cos(rad) + 1) / 2;
                c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,' + z.toFixed(1) + 'px) rotateY(' + ry.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
                c.style.opacity = lerp(0.12 + face * 0.88, 1, t).toFixed(3);
                c.style.filter = t < 1 && face < 0.6 ? 'blur(' + ((0.6 - face) * 5 * (1 - t)).toFixed(1) + 'px)' : '';
                c.style.zIndex = String(Math.round(lerp(face * 100, 50, t)));
                c.classList.toggle('is-front', t === 0 && face > 0.97);
            });
            var flat = t >= 0.999;
            if (flat !== gal.classList.contains('is-flat')) {
                gal.classList.toggle('is-flat', flat);
                // Once flat, the cursor says "Visit" on each card instead of "Drag"
                if (flat) { track.removeAttribute('data-cursor'); cards.forEach(function (c) { c.setAttribute('data-cursor', 'Visit'); }); }
                else { track.setAttribute('data-cursor', 'Drag'); cards.forEach(function (c) { c.removeAttribute('data-cursor'); }); }
            }
            if (hint) hint.style.opacity = (1 - ramp(oP, 0.42, 0.55)).toFixed(3);
            if (bar) bar.style.setProperty('--p', oP.toFixed(3));
        };

        var updateBar = function () {
            if (orbit) return;
            var max = Math.max(1, track.scrollWidth - track.clientWidth);
            var p = clamp(track.scrollLeft / max, 0, 1);
            var stepPx = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth * 0.8;
            if (bar) bar.style.setProperty('--p', p.toFixed(3));
            var idx = p > 0.98 ? N - 1 : Math.round(track.scrollLeft / stepPx);
            if (countNow) countNow.textContent = '0' + Math.min(N, idx + 1);
            if (prev) prev.disabled = track.scrollLeft < 4;
            if (next) next.disabled = track.scrollLeft > max - 4;
        };
        [prev, next].forEach(function (b) {
            if (b) b.addEventListener('click', function () {
                var stepPx = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth * 0.8;
                track.scrollBy({ left: stepPx * +b.dataset.dir, behavior: 'smooth' });
            });
        });
        track.addEventListener('scroll', updateBar, { passive: true });

        // Drag: spins the ring (desktop) or slides the carousel (mouse on smaller screens)
        track.addEventListener('pointerdown', function (e) {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            if (orbit && (frozen || gal.classList.contains('is-flat'))) return;
            dragging = true; moved = 0; startX = lastX = e.clientX; startL = track.scrollLeft; spinVel = 0;
            track.classList.add('is-dragging');
        });
        window.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var dx = e.clientX - lastX; lastX = e.clientX;
            moved = Math.max(moved, Math.abs(e.clientX - startX));
            if (orbit) { spin += dx * 0.25; spinVel = dx * 0.25; YN.dirty = true; }
            else { track.scrollLeft = startL - (e.clientX - startX); spinVel = dx; }
        });
        window.addEventListener('pointerup', function () {
            if (!dragging) return;
            dragging = false; track.classList.remove('is-dragging');
            if (!orbit) {
                (function coast() { spinVel *= 0.92; track.scrollLeft -= spinVel; if (Math.abs(spinVel) > 0.5) requestAnimationFrame(coast); })();
            }
        });
        track.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
        track.addEventListener('dragstart', function (e) { e.preventDefault(); });

        var oVis = false;
        if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { oVis = es[0].isIntersecting; }).observe(gal);
        YN.onFrame(function (t, changed) {
            if (!orbit) return;
            var dt = oLast ? Math.min(64, t - oLast) : 16; oLast = t;
            var spinning = false;
            if (!frozen && !dragging && oVis && !document.hidden) {
                // gentle drift plus any flick momentum from a drag
                spinVel *= 0.94;
                spin += spinVel + dt * 0.004;
                spinning = true;
            }
            if (changed || spinning || dragging) render();
        });
        window.addEventListener('resize', layout);
        window.addEventListener('load', layout);
        layout();
    }

    // =====================================================================
    // Services: floating preview that follows the cursor over each row
    // =====================================================================
    var rows = document.querySelectorAll('.ix-row[data-img]');
    if (rows.length && fine && motion) {
        var fl = document.createElement('div'); fl.className = 'ix-float'; fl.setAttribute('aria-hidden', 'true');
        fl.innerHTML = '<div class="ix-float-inner"></div>';
        document.body.appendChild(fl);
        var flIn = fl.firstChild, fx = 0, fy = 0, tx = 0, ty = 0, showing = false;
        rows.forEach(function (row) {
            var im = new Image(); im.src = row.dataset.img; im.alt = ''; flIn.appendChild(im);
            row.addEventListener('pointerenter', function (e) {
                Array.prototype.forEach.call(flIn.children, function (c) { c.classList.toggle('is-on', c.getAttribute('src') === row.dataset.img); });
                if (!showing) { fx = tx = e.clientX; fy = ty = e.clientY; }
                showing = true; fl.classList.add('is-on');
            });
            row.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; });
            row.addEventListener('pointerleave', function () { showing = false; fl.classList.remove('is-on'); });
        });
        YN.onFrame(function () {
            if (!showing && !fl.classList.contains('is-on')) return;
            var dx = tx - fx; fx += dx * 0.14; fy += (ty - fy) * 0.14;
            fl.style.transform = 'translate3d(' + fx.toFixed(1) + 'px,' + fy.toFixed(1) + 'px,0) rotate(' + clamp(dx * 0.08, -10, 10).toFixed(2) + 'deg)';
        });
    }

    // =====================================================================
    // Marquee band: drifts on its own, speeds up and leans with scroll
    // =====================================================================
    var band = document.querySelector('.ix-band');
    var bandTrack = band && band.querySelector('.ix-band-track');
    if (bandTrack && motion) {
        var bandX = 0, bandVis = true, bandLastY = window.scrollY, bandVel = 0, bandLastT = 0, bandHover = false;
        band.classList.add('is-js');
        if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { bandVis = es[0].isIntersecting; }).observe(band);
        band.addEventListener('pointerenter', function () { bandHover = true; });
        band.addEventListener('pointerleave', function () { bandHover = false; });
        YN.onFrame(function (t) {
            var dt = bandLastT ? Math.min(64, t - bandLastT) : 16; bandLastT = t;
            var y = window.scrollY, dy = y - bandLastY; bandLastY = y;
            bandVel += (dy - bandVel) * 0.1;
            if (!bandVis) return;
            var half = bandTrack.scrollWidth / 2 || 1;
            bandX -= (bandHover ? 0.2 : 1) * 0.05 * dt + Math.abs(bandVel) * 0.5;
            if (bandX <= -half) bandX += half;
            bandTrack.style.transform = 'translate3d(' + bandX.toFixed(1) + 'px,0,0) skewX(' + clamp(-bandVel * 0.25, -12, 12).toFixed(2) + 'deg)';
        });
    }

    // =====================================================================
    // Ambient colour: the page background blends between moods per section
    // =====================================================================
    var MOODS = {
        ink:      [[5, 6, 11],   [70, 60, 160],  [30, 90, 140]],
        indigo:   [[9, 9, 30],   [110, 90, 230], [50, 110, 210]],
        plum:     [[20, 9, 30],  [165, 100, 230], [230, 110, 170]],
        teal:     [[3, 18, 24],  [60, 200, 170], [60, 130, 220]],
        midnight: [[5, 12, 34],  [80, 130, 255], [150, 110, 255]],
        violet:   [[14, 9, 34],  [150, 120, 255], [90, 200, 200]]
    };
    var moodEls = Array.prototype.slice.call(document.querySelectorAll('[data-mood]'));
    if (moodEls.length) {
        var cur = MOODS.ink.map(function (c) { return c.slice(); });
        var setVars = function () {
            root.style.setProperty('--amb-base', 'rgb(' + cur[0].map(Math.round).join(',') + ')');
            root.style.setProperty('--amb-a', 'rgba(' + cur[1].map(Math.round).join(',') + ',0.30)');
            root.style.setProperty('--amb-b', 'rgba(' + cur[2].map(Math.round).join(',') + ',0.22)');
        };
        var target = MOODS.ink;
        YN.onFrame(function (t, changed) {
            if (changed) {
                var mid = vh() * 0.5, found = null;
                for (var i = 0; i < moodEls.length; i++) {
                    var r = moodEls[i].getBoundingClientRect();
                    if (r.top <= mid && r.bottom >= mid) { found = moodEls[i]; break; }
                }
                target = MOODS[(found && found.dataset.mood) || 'ink'] || MOODS.ink;
            }
            var diff = 0, k = motion ? 0.045 : 1;
            for (var a2 = 0; a2 < 3; a2++) for (var c2 = 0; c2 < 3; c2++) {
                var d = target[a2][c2] - cur[a2][c2]; diff += Math.abs(d); cur[a2][c2] += d * k;
            }
            if (diff > 0.5 || changed) setVars();
        });
        setVars();
    }

    // Hero photos 2-4 load after the page has, so the first one shows fast
    var deferred = document.querySelectorAll('.ix-hero img[data-srcset]');
    var loadDeferred = function () { deferred.forEach(function (im) { im.srcset = im.dataset.srcset; im.src = im.dataset.src; im.removeAttribute('data-srcset'); }); };
    if (document.readyState === 'complete') setTimeout(loadDeferred, 200); else window.addEventListener('load', function () { setTimeout(loadDeferred, 200); });

    // =====================================================================
    // Process steps light up in turn; final section eases in
    // =====================================================================
    var proc = document.querySelector('.ix-process');
    var steps = proc ? proc.querySelectorAll('.ix-step') : [];
    var fin = document.querySelector('.ix-final');
    var finMedia = fin && fin.querySelector('.ix-final-media');
    var progressOf = function (el) { var r = el.getBoundingClientRect(); return clamp((vh() - r.top) / (r.height + vh()), 0, 1); };

    YN.onFrame(function (t, changed) {
        if (pin && fine && motion && slideshow) {
            mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
            slideshow.style.transform = 'translate3d(' + (-mx * 24).toFixed(2) + 'px,' + (-my * 16).toFixed(2) + 'px,0) scale(1.04)';
        }
        if (!changed) return;
        if (hero && motion) heroUpdate();
        if (proc && motion) {
            proc.style.setProperty('--pp', ramp(progressOf(proc), 0.15, 0.75).toFixed(3));
            var mid = vh() * 0.55;
            steps.forEach(function (s) { s.classList.toggle('is-lit', s.getBoundingClientRect().top < mid); });
        }
        if (finMedia && motion) finMedia.style.transform = 'scale(' + (1.08 - 0.08 * ramp(progressOf(fin), 0, 0.55)).toFixed(4) + ')';
    });
})();
