#!/usr/bin/env python3
"""Builds the Hunting Shack site from the text files in _src/.

Usage (from anywhere):  python3 Hunting-Shack/_src/build.py
Needs Pillow (pip install pillow) to make photo thumbnails.

Content lives in:
  _src/site.json        crew roster, The Race scorecard, links, home photos
  _src/seasons/YYYY.md  one hunting season per file
  _src/jake/YYYY.md     Jake's Territory bowhunting stories
  _src/cabin/*.md       cabin build logs
Photos go in photos/ (full size). Thumbnails in photos/t/ are generated.
"""
import html
import json
import re
from pathlib import Path

from PIL import Image

SRC = Path(__file__).resolve().parent
OUT = SRC.parent
PHOTOS = OUT / "photos"
THUMBS = PHOTOS / "t"
THUMB_W = 300

site = json.loads((SRC / "site.json").read_text())
esc = html.escape


# ---------- content parsing ----------

def read_doc(path):
    """Header lines ('key: value') until the first blank line, then the body."""
    text = path.read_text()
    head, _, body = text.partition("\n\n")
    meta = {}
    for line in head.splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()
    meta["photos"] = [p.strip() for p in meta.get("photos", "").split(",") if p.strip()]
    return meta, body.strip()


def inline(s):
    s = esc(s, quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)


def paras(body):
    return "\n".join(f"<p>{inline(p.strip())}</p>" for p in re.split(r"\n\s*\n", body) if p.strip())


def load_season(path):
    meta, body = read_doc(path)
    hunters_txt, _, notes = body.partition("## Notes")
    hunters = []
    for line in hunters_txt.replace("## Hunters", "").strip().splitlines():
        tagged = line.startswith("+ ")
        name, _, result = line.lstrip("+ ").partition(":")
        hunters.append({"name": name.strip(), "result": result.strip(), "tagged": tagged})
    return {
        "year": int(meta["year"]),
        "bucks": int(meta["bucks"]),
        "does": int(meta["does"]),
        "photos": meta["photos"],
        "hunters": hunters,
        "notes": notes.strip(),
        "teaser": meta.get("teaser") or first_sentence(notes.strip()),
    }


def first_sentence(md, limit=150):
    """Plain-text teaser: skip bold labels like '**First Weekend:**', keep whole sentences up to limit."""
    text = " ".join(re.sub(r"^\*\*.+?\*\*\s*", "", p).strip() for p in md.split("\n") if p.strip())
    out = ""
    for sentence in re.findall(r"[^.!?]+[.!?]*\s*", text):
        if out and len(out) + len(sentence) > limit:
            break
        out += sentence
    out = out.strip()
    return out if len(out) <= limit else out[: limit - 1].rsplit(" ", 1)[0] + "…"


# ---------- photos ----------

_dims = {}


def thumb(name):
    """Make (or reuse) a thumbnail; return (thumb_w, thumb_h)."""
    if name in _dims:
        return _dims[name]
    src = PHOTOS / name
    dst = THUMBS / name
    if not src.exists():
        raise SystemExit(f"Missing photo: photos/{name}")
    if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
        THUMBS.mkdir(parents=True, exist_ok=True)
        im = Image.open(src).convert("RGB")
        im.thumbnail((THUMB_W, THUMB_W * 2))
        im.save(dst, "JPEG", quality=62, optimize=True, progressive=True)
    with Image.open(dst) as im:
        _dims[name] = im.size
    return _dims[name]


def gallery(photos, label, cls="gallery"):
    if not photos:
        return ""
    items = []
    for i, p in enumerate(photos, 1):
        w, h = thumb(p)
        alt = f"{label}, photo {i} of {len(photos)}"
        items.append(
            f'<li><a href="photos/{esc(p)}" data-lightbox="{esc(label)}">'
            f'<img src="photos/t/{esc(p)}" width="{w}" height="{h}" loading="lazy" decoding="async" alt="{esc(alt)}"></a></li>'
        )
    return f'<ul class="{cls}">{"".join(items)}</ul>'


# ---------- page shell ----------

NAV = [
    ("index.html", "Home"),
    ("hunting-log.html", "Log"),
    ("the-race.html", "Race"),
    ("jakes-territory.html", "Jake's"),
    ("cabin.html", "Cabin"),
]

ANTLERS = (
    '<svg class="mark" viewBox="0 0 64 48" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3.2" '
    'stroke-linecap="round" stroke-linejoin="round" d="M32 46V30M32 30c-6 0-11-5-12-12M20 18c-1-6 0-11 3-15M20 18c-4-2-8-6-9-11'
    'M14 24c-5 0-9-3-11-8M32 30c6 0 11-5 12-12M44 18c1-6 0-11-3-15M44 18c4-2 8-6 9-11M50 24c5 0 9-3 11-8"/></svg>'
)


def page(filename, title, body, active=None, description=None):
    current = ' aria-current="page"'
    nav = "".join(f'<a href="{href}"{current if href == active else ""}>{label}</a>' for href, label in NAV)
    full_title = site["title"] if filename == "index.html" else f"{title} · {site['title']}"
    desc = description or site["tagline"]
    submit = (
        f'Got a story or pictures? <a href="mailto:{esc(site["submit_email"])}?subject=Hunting%20Shack%20story">Send them in</a>.'
        if site["submit_email"]
        else "Got a story or pictures? Send them to the camp scribe."
    )
    doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(full_title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#2f4a34">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Courier+Prime:wght@400;700&display=swap">
<link rel="stylesheet" href="assets/style.css">
<script src="assets/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <a class="brand" href="index.html">{ANTLERS}<span class="brand-name">{esc(site['title'])}</span><span class="brand-sub">Est. 1994 · Deer Camp</span></a>
  <nav class="nav" aria-label="Main">{nav}</nav>
</header>
<main id="main">
{body}
</main>
<footer class="footer">
  <p class="stamp">&ldquo;{esc(site['motto'])}&rdquo;</p>
  <p>{submit}</p>
  <p class="fine">John Family &amp; Friends Hunting Shack · since 1994</p>
</footer>
</body>
</html>
"""
    (OUT / filename).write_text(doc)


def tags(bucks, does):
    return (
        f'<div class="tags"><span class="tag"><b>{bucks}</b> Buck{"s" if bucks != 1 else ""}</span>'
        f'<span class="tag tag-doe"><b>{does}</b> Doe{"s" if does != 1 else ""}</span></div>'
    )


# ---------- pages ----------

def build_seasons(seasons):
    by_year = sorted(seasons, key=lambda s: s["year"])
    for i, s in enumerate(by_year):
        older = by_year[i - 1]["year"] if i > 0 else None
        newer = by_year[i + 1]["year"] if i + 1 < len(by_year) else None
        rows = []
        for h in s["hunters"]:
            result = esc(h["result"]) if h["result"] else '<span class="muted">No report</span>'
            stamp = '<span class="stamp-tag">Tagged</span>' if h["tagged"] else ""
            rows.append(
                f'<li class="{"tagged" if h["tagged"] else ""}"><span class="who">{esc(h["name"])}</span>'
                f'<span class="what">{result}{stamp}</span></li>'
            )
        pager = '<nav class="pager" aria-label="Seasons">'
        pager += f'<a href="{older}.html" rel="prev">&larr; {older}</a>' if older else "<span></span>"
        pager += '<a href="hunting-log.html">All seasons</a>'
        pager += f'<a href="{newer}.html" rel="next">{newer} &rarr;</a>' if newer else "<span></span>"
        pager += "</nav>"
        photos = (
            f'<section class="block"><h2>Photos</h2>{gallery(s["photos"], str(s["year"]) + " season")}</section>'
            if s["photos"]
            else ""
        )
        body = f"""
<div class="wrap">
  <p class="crumb"><a href="hunting-log.html">Hunting Log</a></p>
  <div class="season-head">
    <h1>{s['year']} Season</h1>
    {tags(s['bucks'], s['does'])}
  </div>
  <section class="block card">
    <h2>Who saw what</h2>
    <ul class="ledger">{"".join(rows)}</ul>
  </section>
  <section class="block prose">
    <h2>Camp notes</h2>
    {paras(s['notes'])}
  </section>
  {photos}
  {pager}
</div>"""
        page(f"{s['year']}.html", f"{s['year']} Season", body, "hunting-log.html",
             f"The {s['year']} deer season at the Hunting Shack: {s['teaser']}")


def build_log(seasons):
    cards = []
    for s in sorted(seasons, key=lambda s: -s["year"]):
        cover = ""
        if s["photos"]:
            w, h = thumb(s["photos"][0])
            cover = f'<img src="photos/t/{esc(s["photos"][0])}" width="{w}" height="{h}" loading="lazy" decoding="async" alt="">'
        n = len(s["photos"])
        cards.append(
            f'<li><a class="year-card" href="{s["year"]}.html">'
            f'<span class="year">{s["year"]}</span>{cover}'
            f'{tags(s["bucks"], s["does"])}'
            f'<span class="teaser">{esc(s["teaser"])}</span>'
            f'<span class="meta">{n} photo{"s" if n != 1 else ""} · {len(s["hunters"])} hunters</span>'
            f"</a></li>"
        )
    tb = sum(s["bucks"] for s in seasons)
    td = sum(s["does"] for s in seasons)
    body = f"""
<div class="wrap">
  <h1>Hunting Log</h1>
  <p class="lede">Every season since the shack was a fence. Tap a year for who saw what, the camp notes and the pictures.</p>
  <dl class="stats">
    <div><dt>Seasons</dt><dd>{len(seasons)}</dd></div>
    <div><dt>Bucks</dt><dd>{tb}</dd></div>
    <div><dt>Does</dt><dd>{td}</dd></div>
  </dl>
  <ul class="years">{"".join(cards)}</ul>
</div>"""
    page("hunting-log.html", "Hunting Log", body, "hunting-log.html", "Season-by-season deer camp log since 1994.")


def race_rows(rows, unit):
    top = max(r[2] for r in rows) or 1
    out = []
    for rank, (name, history, total) in enumerate(rows, 1):
        hist = re.sub(r"\(\*([^)]*)\)", r'<span class="void" title="Does not count">(\1)</span>', esc(history))
        out.append(
            f'<li><span class="rank">{rank}</span><div class="racer"><div class="racer-top"><span class="who">{esc(name)}</span>'
            f'<span class="pts">{total}<small> {unit}</small></span></div>'
            f'<span class="bar"><span style="width:{max(total / top * 100, 2):.0f}%"></span></span>'
            f'<span class="hist">{hist}</span></div></li>'
        )
    return f'<ol class="race">{"".join(out)}</ol>'


def build_race():
    r = site["race"]
    rules = "".join(f"<li>{esc(x)}</li>" for x in r["rules"])
    body = f"""
<div class="wrap">
  <h1>The Race</h1>
  <p class="lede">The official camp scorecard. Bragging rights only &mdash; no cash prizes, no recounts.</p>
  <section class="block card">
    <h2>Bucks <small>by antler points</small></h2>
    {race_rows(r['bucks'], 'pts')}
    <p class="total">Bucks since 1994: <b>{r['bucks_total']}</b></p>
  </section>
  <section class="block card">
    <h2>Does <small>by does tagged</small></h2>
    {race_rows(r['does'], 'tagged')}
    <p class="total">Does since 1994: <b>{r['does_total']}</b></p>
  </section>
  <section class="block prose">
    <h2>House rules</h2>
    <ul>{rules}</ul>
  </section>
</div>"""
    page("the-race.html", "The Race", body, "the-race.html", "The Hunting Shack buck and doe race scorecard.")


def build_jake():
    stories = []
    for path in sorted((SRC / "jake").glob("*.md"), reverse=True):
        meta, body = read_doc(path)
        stories.append(f"""
  <article class="block story card">
    <p class="kicker">{esc(meta['date'])}</p>
    <h2>{esc(meta['title'])}</h2>
    <div class="prose">{paras(body)}</div>
    {gallery(meta['photos'], meta['title'])}
  </article>""")
    hm = "".join(f"<li>{esc(x)}</li>" for x in site["honorable_mentions"])
    body = f"""
<div class="wrap">
  <h1>Jake's Territory</h1>
  <p class="lede">A chronicle of Jake's bowhunting life &mdash; told by Jake, so adjust for the motto accordingly.</p>
  {"".join(stories)}
  <section class="block prose">
    <h2>Honorable mention</h2>
    <ul>{hm}</ul>
    <p class="muted">No pictures. You'll have to take his word for it.</p>
  </section>
</div>"""
    page("jakes-territory.html", "Jake's Territory", body, "jakes-territory.html", "Jake's bowhunting stories.")


def build_cabin():
    logs = []
    toc = []
    for path in sorted((SRC / "cabin").glob("*.md"), key=lambda p: read_doc(p)[0]["date"]):
        meta, body = read_doc(path)
        anchor = path.stem
        toc.append(f'<li><a href="#{anchor}">{esc(meta["title"])}</a></li>')
        logs.append(f"""
  <article class="block entry" id="{anchor}">
    <p class="kicker">Captain's log &middot; {esc(meta['stardate'])}</p>
    <h2>{esc(meta['title'])}</h2>
    <div class="prose">{paras(body)}</div>
    {gallery(meta['photos'], meta['title'])}
  </article>""")
    body = f"""
<div class="wrap">
  <h1>The Cabin</h1>
  <p class="lede">{esc(site['cabin_intro'])}</p>
  <nav class="card toc" aria-label="Work weekends"><h2>Work weekends</h2><ol>{"".join(toc)}</ol></nav>
  <div class="timeline">{"".join(logs)}</div>
</div>"""
    page("cabin.html", "The Cabin", body, "cabin.html", "Building the new Hunting Shack cabin, 2014–2016.")


def build_home(seasons):
    latest = max(seasons, key=lambda s: s["year"])
    snaps = []
    for p in site["home_photos"]:
        w, h = thumb(p)
        snaps.append(
            f'<li><a href="photos/{esc(p)}" data-lightbox="Camp snapshots">'
            f'<img src="photos/t/{esc(p)}" width="{w}" height="{h}" loading="lazy" decoding="async" alt="Camp snapshot"></a></li>'
        )
    crew = "".join(
        f'<li><span class="first">{esc(m[0])}</span> <span class="nick">&ldquo;{esc(m[1])}&rdquo;</span> '
        f'<span class="last">{esc(m[2])}</span>{f"<small>{esc(m[3])}</small>" if len(m) > 3 else ""}</li>'
        for m in site["members"]
    )
    links = "".join(
        f'<li><a href="{esc(u)}" rel="noopener">{esc(n)}</a>{f" <span class=muted>&mdash; {esc(d)}</span>" if d else ""}</li>'
        for n, u, d in site["links"]
    )
    sign_w, sign_h = thumb("67.jpg")
    body = f"""
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="kicker">The official website of the</p>
      <h1>John Family &amp; Friends Hunting Shack</h1>
      <p class="lede">{esc(site['intro'])}</p>
    </div>
    <figure class="sign">
      <img src="photos/67.jpg" width="{sign_w}" height="{sign_h}" alt="Sign on the shack door: The Deuce, T.J.'s Place II. Never let a lie get in the way of a good story.">
      <figcaption>The motto on the door</figcaption>
    </figure>
  </div>
</section>
<div class="wrap">
  <ul class="tiles">
    <li><a href="hunting-log.html"><b>Hunting Log</b><span>{len(seasons)} seasons of who saw what</span></a></li>
    <li><a href="the-race.html"><b>The Race</b><span>Antler points &amp; bragging rights</span></a></li>
    <li><a href="jakes-territory.html"><b>Jake's Territory</b><span>Bowhunting stories</span></a></li>
    <li><a href="cabin.html"><b>The Cabin</b><span>The 2014 build, weekend by weekend</span></a></li>
  </ul>

  <section class="block card latest">
    <p class="kicker">Latest season</p>
    <div class="season-head"><h2><a href="{latest['year']}.html">{latest['year']}</a></h2>{tags(latest['bucks'], latest['does'])}</div>
    <p>{esc(latest['teaser'])}</p>
    <p><a class="btn" href="{latest['year']}.html">Read the {latest['year']} log &rarr;</a></p>
  </section>

  <section class="block">
    <h2>Camp snapshots</h2>
    <ul class="snaps">{"".join(snaps)}</ul>
  </section>

  <section class="block card">
    <h2>The hunting party <small>past &amp; present</small></h2>
    <ul class="crew">{crew}</ul>
  </section>

  <section class="block prose">
    <h2>Handy links</h2>
    <ul class="links">{links}</ul>
  </section>
</div>"""
    page("index.html", site["title"], body, "index.html",
         "The John Family & Friends Hunting Shack: deer camp stories, hunting logs and photos since 1994.")


def main():
    seasons = [load_season(p) for p in sorted((SRC / "seasons").glob("*.md"))]
    build_seasons(seasons)
    build_log(seasons)
    build_race()
    build_jake()
    build_cabin()
    build_home(seasons)
    print(f"Built {len(seasons)} seasons, {len(_dims)} photos.")


if __name__ == "__main__":
    main()
