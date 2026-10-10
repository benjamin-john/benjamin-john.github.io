# Editing the Hunting Shack site

The pages in `Hunting-Shack/` are generated. Edit the text files here, then run:

    pip install pillow        # once
    python3 Hunting-Shack/_src/build.py

Commit the regenerated `.html` files and any new photos. (Folders starting with `_` are not published by GitHub Pages.)

## Adding a new season

Copy `seasons/2018.md` to `seasons/2019.md` and edit it:

    year: 2019
    bucks: 2
    does: 1
    photos: my-photo-1.jpg, my-photo-2.jpg
    teaser: (optional) one-line summary for the Hunting Log list

    ## Hunters
    + Larry: Shot a 7 Point Buck      <- a leading "+" adds the TAGGED stamp
    Jeff: Saw nothing

    ## Notes
    Paragraphs separated by a blank line. **Bold** works for labels like **First Weekend:**

Put the photos in `Hunting-Shack/photos/` (around 1200px wide is plenty). Thumbnails are made automatically.

## Other content

- `site.json`: crew roster, The Race scorecard (update totals by hand), links, home page snapshots, and `submit_email` (leave blank to hide the address).
- `jake/*.md`: Jake's Territory stories.
- `cabin/*.md`: cabin build logs (sorted by their `date:` line).
