/**
 * Bio Klick marketing site - behaviour.
 * Plain JavaScript, no build step and no external dependencies.
 * Store URLs are defined once in the "Download buttons" section below.
 */
/* Flags the document as JS-enabled so CSS can apply the reveal animations. */
document.documentElement.classList.add("js");
/* Sharing section: decorative QR pattern (illustrative, not a scannable code). */
var q = document.getElementById("qr"),
  h = "";
for (var y = 0; y < 11; y++)
  for (var x = 0; x < 11; x++) {
    var f = (x < 3 || x > 7) && (y < 3 || y > 7) && !(x > 7 && y > 7);
    var on = f
      ? x % 8 < 3 && y % 8 < 3 && !(x % 8 == 1 && y % 8 == 1) && true
      : (x * 7 + y * 13 + x * y) % 3 === 0;
    if (f) {
      var ex = x > 7 ? x - 8 : x,
        ey = y > 7 ? y - 8 : y;
      on = !(ex == 1 && ey == 1);
    }
    if (on)
      h +=
        '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="1" height="1" fill="#CAF0F8"/>';
  }
q.innerHTML = h;
/* Scroll reveal: adds .in to every .rv element once it enters the viewport. */
var io = new IntersectionObserver(
  function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        var t = e.target;
        t.classList.add("in");
        io.unobserve(t);
        setTimeout(function () {
          t.style.transitionDelay = "";
        }, 1200);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
);
document.querySelectorAll(".rv").forEach(function (e) {
  var sib = Array.prototype.filter.call(e.parentNode.children, function (x) {
    return x.classList.contains("rv");
  });
  e.style.transitionDelay =
    (sib.length > 1 ? Math.min(sib.indexOf(e), 4) * 110 : 0) + "ms";
  io.observe(e);
});

/* Main module. */
(function () {
  var $ = function (i) {
    return document.getElementById(i);
  };
  /* Analytics dashboard: sample data, tabs and time-range filter. */
  var T = document.querySelectorAll(".tab"),
    PN = document.querySelectorAll(".tp"),
    DAYS = "MTWTFSS",
    NM = ["WhatsApp", "Instagram", "Portfolio", "Website", "LinkedIn"],
    CT = ["Cairo, Egypt", "Alexandria, Egypt", "Riyadh, Saudi Arabia"],
    DATA = {
      all: {
        k: [12430, 4310, 34.7],
        tt: "Activity by month",
        w: [
          ["Jun", 40],
          ["Jul", 56],
          ["Aug", 72],
          ["Sep", 88],
          ["Oct", 100],
        ],
        hm: [
          [0.2, 0.22, 0.2, 0.28, 0.24, 0.15, 0.1],
          [0.4, 0.45, 0.42, 0.5, 0.46, 0.35, 0.3],
          [0.62, 0.7, 0.66, 0.82, 0.72, 0.6, 0.52],
          [0.32, 0.36, 0.42, 0.58, 0.54, 0.68, 0.42],
        ],
        pk: "Thursday, 8 PM",
        s: [45, 36, 19],
        l: [1520, 1210, 820, 480, 280],
        os: [42, 38, 20],
        c: [34, 16, 11],
      },
      "7d": {
        k: [1248, 436, 34.9],
        tt: "Weekly activity",
        w: [
          ["Mon", 38],
          ["Tue", 52],
          ["Wed", 46],
          ["Thu", 88],
          ["Fri", 70],
          ["Sat", 96],
          ["Sun", 60],
        ],
        hm: [
          [0.15, 0.2, 0.18, 0.25, 0.2, 0.1, 0.08],
          [0.35, 0.4, 0.38, 0.45, 0.42, 0.3, 0.25],
          [0.6, 0.7, 0.65, 0.8, 0.7, 0.55, 0.5],
          [0.3, 0.35, 0.4, 0.55, 0.5, 0.7, 0.4],
        ],
        pk: "Thursday, 8 PM",
        s: [52, 31, 17],
        l: [168, 126, 76, 42, 24],
        os: [46, 38, 16],
        c: [38, 14, 9],
      },
      "30d": {
        k: [4860, 1720, 35.4],
        tt: "Activity by week",
        w: [
          ["Wk 1", 52],
          ["Wk 2", 68],
          ["Wk 3", 84],
          ["Wk 4", 98],
        ],
        hm: [
          [0.18, 0.2, 0.2, 0.26, 0.22, 0.12, 0.1],
          [0.38, 0.42, 0.4, 0.46, 0.44, 0.34, 0.3],
          [0.58, 0.62, 0.6, 0.7, 0.74, 0.84, 0.6],
          [0.3, 0.34, 0.38, 0.5, 0.5, 0.72, 0.46],
        ],
        pk: "Saturday, 9 PM",
        s: [48, 34, 18],
        l: [640, 470, 310, 190, 110],
        os: [44, 38, 18],
        c: [36, 15, 10],
      },
    };
  function pr(l, v, t) {
    return (
      '<div class="pr"><span>' +
      l +
      '</span><div class="pb"><i style="--v:' +
      v +
      '"></i></div><em>' +
      t +
      "</em></div>"
    );
  }
  function render(k) {
    var d = DATA[k],
      h = "",
      mx = 0,
      pr0 = 0,
      pc = 0;
    d.hm.forEach(function (row, r) {
      row.forEach(function (v, c) {
        if (v > mx) {
          mx = v;
          pr0 = r;
          pc = c;
        }
      });
    });
    h =
      "<em></em>" +
      DAYS.split("")
        .map(function (x) {
          return "<em>" + x + "</em>";
        })
        .join("");
    ["6 AM", "12 PM", "6 PM", "12 AM"].forEach(function (l, r) {
      h += "<em>" + l + "</em>";
      d.hm[r].forEach(function (v, c) {
        h +=
          '<i style="--o:' +
          (0.12 + v * 0.88).toFixed(2) +
          '"' +
          (r === pr0 && c === pc ? ' class="pk"' : "") +
          "></i>";
      });
    });
    var cl = ["#CCFF33", "#CAF0F8", "#3c96ff"],
      sn = ["NFC", "QR code", "Direct link"];
    $("p0").innerHTML =
      '<div class="kpis"><div><b class="kv" data-n="' +
      d.k[0] +
      '">0</b><span>Visits</span></div><div><b class="kv" data-n="' +
      d.k[1] +
      '">0</b><span>Clicks</span></div><div><b class="kv" data-n="' +
      d.k[2] +
      '" data-d="1">0</b><span>CTR %</span></div></div><h4>' +
      d.tt +
      '</h4><div class="wk">' +
      d.w
        .map(function (x) {
          return (
            '<div><i style="--v:' + x[1] + '"></i><em>' + x[0] + "</em></div>"
          );
        })
        .join("") +
      '</div><div class="two"><div><h4>Peak engagement</h4><div class="hm">' +
      h +
      '</div><small class="pkt">Peak: ' +
      d.pk +
      '</small></div><div><h4>Sources</h4><div class="stack">' +
      d.s
        .map(function (v, i) {
          return '<i style="--v:' + v + ";background:" + cl[i] + '"></i>';
        })
        .join("") +
      '</div><ul class="leg">' +
      d.s
        .map(function (v, i) {
          return (
            '<li><i style="background:' +
            cl[i] +
            '"></i>' +
            sn[i] +
            "<b>" +
            v +
            "%</b></li>"
          );
        })
        .join("") +
      "</ul></div></div>";
    var m = Math.max.apply(null, d.l);
    $("p1").innerHTML =
      "<h4>Top links</h4>" +
      NM.map(function (n, i) {
        return pr(
          "<u>" + (i + 1) + "</u>" + n,
          Math.round((d.l[i] / m) * 100),
          d.l[i].toLocaleString("en-US"),
        );
      }).join("");
    var o = d.os,
      mob = o[0] + o[1];
    $("p2").innerHTML =
      "<h4>Devices</h4>" +
      pr("Mobile", mob, mob + "%") +
      pr("Desktop", o[2], o[2] + "%") +
      '<h4 style="margin-top:22px">Operating system</h4>' +
      pr("iOS", o[0], o[0] + "%") +
      pr("Android", o[1], o[1] + "%") +
      pr("Windows", o[2], o[2] + "%") +
      '<h4 style="margin-top:22px">Top locations</h4>' +
      CT.map(function (n, i) {
        return pr(n, d.c[i] * 2, d.c[i] + "%");
      }).join("");
    kc();
  }
  function count(e) {
    var n = +e.dataset.n,
      d = +e.dataset.d || 0,
      t0 = performance.now();
    (function f(t) {
      var p = Math.min(1, (t - t0) / 900),
        v = n * (1 - Math.pow(1 - p, 3));
      e.textContent = d ? v.toFixed(d) : Math.round(v).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  function kc() {
    document.querySelectorAll(".kv").forEach(count);
  }
  function tab(k) {
    T.forEach(function (t, i) {
      t.classList.toggle("on", i === k);
      t.setAttribute("aria-selected", i === k);
    });
    PN.forEach(function (p, i) {
      p.classList.toggle("on", i === k);
    });
    if (k === 0) kc();
  }
  T.forEach(function (t, i) {
    t.onclick = function () {
      tab(i);
    };
    t.onkeydown = function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tab(i);
      }
    };
  });
  document.querySelectorAll("#rg button").forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll("#rg button").forEach(function (x) {
        x.classList.remove("on");
      });
      b.classList.add("on");
      render(b.dataset.r);
    };
  });
  render("all");
  new IntersectionObserver(
    function (es, o) {
      if (es[0].isIntersecting) {
        kc();
        o.disconnect();
      }
    },
    { threshold: 0.3 },
  ).observe(document.querySelector(".dash"));

  /* Cards: pointer-following highlight (updates --mx / --my). */
  document.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* Connections map: profile photos, people and selection state. */
  var IM = [
    "assets/img/connections/mariam-samy.webp",
    "assets/img/connections/anderea-sameh.webp",
    "assets/img/connections/sara-adel.webp",
    "assets/img/connections/ayman-fathy.webp",
    "assets/img/connections/nour-bassem.webp",
    "assets/img/connections/magdy-amir.webp",
  ];
  function pic(i) {
    return (
      '<image href="' +
      IM[i] +
      '" width="60" height="60" preserveAspectRatio="xMidYMid slice"/>'
    );
  }
  var N = [
      ["Mariam Samy", "Photographer"],
      ["Anderea Sameh", "Graphic designer"],
      ["Sara Adel", "Dentist"],
      ["Ayman Fathy", "Sales manager"],
      ["Nour Bassem", "Founder & Exclusive director"],
      ["Magdy Amir", "Mechanical engineer"],
    ],
    L = $("lines"),
    G = $("nodes"),
    NS = "http://www.w3.org/2000/svg",
    P = [];
  function el(t, a) {
    var e = document.createElementNS(NS, t);
    for (var k in a) e.setAttribute(k, a[k]);
    return e;
  }
  N.forEach(function (n, i) {
    var f = function (j) {
        var q = (j / N.length) * 6.2832 - 1.5708;
        return [200 + 135 * Math.cos(q), 200 + 135 * Math.sin(q)];
      },
      c = f(i),
      d = f((i + 1) % N.length);
    L.appendChild(
      el("line", { class: "c", x1: c[0], y1: c[1], x2: d[0], y2: d[1] }),
    );
    var ln = el("line", { x1: 200, y1: 200, x2: c[0], y2: c[1] });
    L.appendChild(ln);
    var g = el("g", {
      class: "nd",
      tabindex: 0,
      role: "button",
      "aria-label": n[0],
    });
    var a = el("g", {
      transform: "translate(" + (c[0] - 30) + " " + (c[1] - 30) + ")",
    });
    a.innerHTML =
      '<clipPath id="cp' +
      i +
      '"><circle cx="30" cy="30" r="30"/></clipPath><g clip-path="url(#cp' +
      i +
      ')">' +
      pic(i) +
      "</g>";
    g.appendChild(a);
    g.appendChild(el("circle", { class: "nr", cx: c[0], cy: c[1], r: 31 }));
    G.appendChild(g);
    P.push([g, ln]);
    g.onclick = function () {
      pick(i);
    };
    g.onkeydown = function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pick(i);
      }
    };
  });
  function pick(i) {
    P.forEach(function (p, k) {
      p[0].classList.toggle("a", k === i);
      p[1].classList.toggle("a", k === i);
    });
    var n = N[i],
      c = $("nc");
    c.querySelector("u").innerHTML =
      '<svg viewBox="0 0 60 60">' + pic(i) + "</svg>";
    c.querySelector("b").textContent = n[0];
    c.querySelector("small").textContent = n[1] + " · saved to your network";
  }
  pick(0);

  /* Download buttons: store URLs and device detection. */
  var UI = "https://apps.apple.com/eg/app/bio-klick/id6807591521",
    UA = "https://play.google.com/store/apps/details?id=com.bioklick.app";
  function dev() {
    var u = navigator.userAgent || "";
    if (/Android/i.test(u)) return "android";
    if (
      /iPhone|iPad|iPod/i.test(u) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    )
      return "ios";
    return "desktop";
  }
  function go(u) {
    var a = document.createElement("a");
    a.href = u;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  var gm = $("gm"),
    last = null,
    bd = document.querySelectorAll(".badges svg");
  if (bd.length > 1) {
    $("ga").appendChild(bd[0].cloneNode(true));
    $("gi").appendChild(bd[1].cloneNode(true));
  }
  function openM(i) {
    gm.querySelectorAll(".gc").forEach(function (c, k) {
      c.classList.toggle("f", k === i);
    });
    last = document.activeElement;
    gm.hidden = false;
    document.body.style.overflow = "hidden";
    gm.querySelector(".gx").focus();
  }
  function closeM() {
    gm.hidden = true;
    document.body.style.overflow = "";
    if (last) last.focus();
  }
  document.addEventListener("click", function (e) {
    var s = e.target.closest(".badges a");
    if (s && dev() === "desktop") {
      e.preventDefault();
      openM(
        s.querySelector("svg").getAttribute("aria-label").indexOf("App Store") >
          -1
          ? 0
          : 1,
      );
      return;
    }
    var a = e.target.closest(".js-get");
    if (!a) return;
    e.preventDefault();
    var d = dev();
    if (d === "ios") go(UI);
    else if (d === "android") go(UA);
    else openM();
  });
  gm.addEventListener("click", function (e) {
    if (e.target === gm || e.target.closest("[data-x]")) closeM();
  });
  addEventListener("keydown", function (e) {
    if (gm.hidden) return;
    if (e.key === "Escape") closeM();
    if (e.key === "Tab") {
      var f = gm.querySelectorAll("button,a[href]"),
        x = f[0],
        y = f[f.length - 1];
      if (e.shiftKey && document.activeElement === x) {
        e.preventDefault();
        y.focus();
      } else if (!e.shiftKey && document.activeElement === y) {
        e.preventDefault();
        x.focus();
      }
    }
  });

  if (dev() === "desktop")
    document.querySelectorAll(".badges a").forEach(function (a) {
      a.removeAttribute("href");
      a.removeAttribute("target");
      a.setAttribute("role", "button");
      a.tabIndex = 0;
      a.onkeydown = function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openM();
        }
      };
    });

  /* Products rail: arrow navigation and mouse drag scrolling. */
  var rl = $("rail"),
    rp = $("rp"),
    rn = $("rn"),
    dn = false,
    sx = 0,
    sl = 0,
    mv = false;
  function ru() {
    var m = rl.scrollWidth - rl.clientWidth;
    rp.disabled = rl.scrollLeft <= 6;
    rn.disabled = rl.scrollLeft >= m - 6;
  }
  function nav(d) {
    var pad = parseFloat(getComputedStyle(rl).paddingLeft) || 0,
      cur = rl.scrollLeft,
      cs = [].slice.call(rl.querySelectorAll(".prod")),
      t = null,
      i;
    if (d > 0) {
      for (i = 0; i < cs.length; i++)
        if (cs[i].offsetLeft - pad > cur + 8) {
          t = cs[i];
          break;
        }
    } else {
      for (i = cs.length - 1; i >= 0; i--)
        if (cs[i].offsetLeft - pad < cur - 8) {
          t = cs[i];
          break;
        }
    }
    rl.scrollTo({
      left: t ? t.offsetLeft - pad : d > 0 ? rl.scrollWidth : 0,
      behavior: "smooth",
    });
  }
  rl.addEventListener("scroll", ru, { passive: true });
  addEventListener("resize", ru);
  ru();
  rp.onclick = function () {
    nav(-1);
  };
  rn.onclick = function () {
    nav(1);
  };

  rl.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") return;
    dn = true;
    mv = false;
    sx = e.clientX;
    sl = rl.scrollLeft;
  });
  addEventListener("pointermove", function (e) {
    if (!dn) return;
    var d = e.clientX - sx;
    if (Math.abs(d) > 5) {
      mv = true;
      rl.classList.add("dg");
    }
    if (mv) rl.scrollLeft = sl - d;
  });
  addEventListener("pointerup", function () {
    dn = false;
    rl.classList.remove("dg");
  });
  rl.addEventListener(
    "click",
    function (e) {
      if (mv) {
        e.preventDefault();
        mv = false;
      }
    },
    true,
  );
  /* FAQ overlay. */
  var fq = $("fq"),
    fl = null;
  function openF() {
    fl = document.activeElement;
    fq.hidden = false;
    document.body.style.overflow = "hidden";
    fq.scrollTop = 0;
    fq.querySelector(".gx").focus();
    try {
      history.replaceState(null, "", "#faq");
    } catch (e) {}
  }
  function closeF() {
    fq.hidden = true;
    document.body.style.overflow = "";
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (e) {}
    if (fl) fl.focus();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest(".js-faq")) {
      e.preventDefault();
      openF();
    } else if (e.target.closest("[data-fx]")) closeF();
  });
  addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !fq.hidden) closeF();
  });
  if (location.hash === "#faq") openF();
  /* Why Switch: comparison slider. */
  var cm = $("cmp"),
    cr = $("crg");

  function sp(v) {
    cm.style.setProperty("--p", v + "%");
  }
  cr.oninput = function () {
    sp(cr.value);
  };
  new IntersectionObserver(
    function (es, o) {
      if (es[0].isIntersecting) {
        o.disconnect();
        var t0 = performance.now();
        (function f(t) {
          var k = Math.min(1, (t - t0) / 1700);
          if (k < 1) {
            var v = 50 + Math.sin(k * Math.PI * 2) * 24;
            cr.value = v;
            sp(v);
            requestAnimationFrame(f);
          } else {
            cr.value = 50;
            sp(50);
          }
        })(t0);
      }
    },
    { threshold: 0.6 },
  ).observe(cm);
  /* Digital Bio: scales the orbit visual to its container width. */
  var ow = $("orbw"),
    ob = $("orb");
  function os() {
    var k = Math.min(1.18, ow.clientWidth / 400);
    ob.style.transform = "translateX(-50%) scale(" + k + ")";
    ow.style.height = 400 * k + "px";
  }
  os();
  addEventListener("resize", os);
  /* Contact popup. */
  var ctm = $("ctm"),
    ctl = null;
  function openC() {
    ctl = document.activeElement;
    ctm.hidden = false;
    document.body.style.overflow = "hidden";
    ctm.querySelector(".gx").focus();
  }
  function closeC() {
    ctm.hidden = true;
    document.body.style.overflow = "";
    if (ctl) ctl.focus();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest(".js-contact")) {
      e.preventDefault();
      openC();
    } else if (e.target === ctm || e.target.closest("[data-cx]")) closeC();
  });
  addEventListener("keydown", function (e) {
    if (!ctm.hidden && e.key === "Escape") closeC();
  });
  /* Copy-to-clipboard buttons ([data-copy]). */
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-copy]");
    if (!c) return;
    e.preventDefault();
    var t = c.dataset.copy,
      o = c.dataset.o || (c.dataset.o = c.textContent);
    function done(ok) {
      c.textContent = ok ? "Copied" : "Copy failed, please select it manually";
      setTimeout(function () {
        c.textContent = o;
      }, 1800);
    }
    function fb() {
      var x = document.createElement("textarea");
      x.value = t;
      x.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(x);
      x.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (_) {}
      x.remove();
      done(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () {
        done(true);
      }, fb);
    } else fb();
  });
})();
