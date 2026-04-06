# BACK STAGE BRAIN
User: bt-adm
Pass: Kas&8d0m_126+

## Ideas
- gigs
  - guest lists: send to band members to enter, download/print pdf
- gear
  - serial numbers: if something gets stolen, insurance/police
- auto features
  - standardized form to venue/promoter ~2 weeks before the show asking for load-in vs soundchack time, parking, backstage, rules, etc.
  - gas & toll estimation
  - hotel suggestions (maybe from other bands as well)
- press kit
- legal
- mailing list
- make it modern
  - mobile first
  - "kill the pdf" - no downloads, but live & responsive web links (with an option to download for the "old guys")
  - "magic advance form": beautiful branded form for the promoter, auto populates the band calendar.
  - real-time tour runway: 
    - google maps to calc fuel costs, show best tank spots
    - optional: profit per member with custom splits after cut/gas etc.
    - payout: venmo/cashapp request to venue/treasurer
    - write bills
  - gear registry
    - serial numbers, photos, value
    - "stolen" button: generates a pre-formatted police report and "stolen gear" images
  - setlist flow builder total runtime, feeling, "banter" gaps: auto build with ai analyzing the music
  - flag songs as "fan favorites"
  - import songs from other platforms (spotify)
  - pre-save links
  - ai assistant for open things
    - "hey, band x asked if they could use your drumkit and wait for a response"
  - merch
  - donate buttons
- tiers
  - garage: 3 members, 5 setlists, 2 gigs/month, 10 gigs/year
  - touring (10-20$): unlimited members, setlists & gigs, stripe connect for splitting merch/door money, advancing, ai features
  - agency (100$): for managers handling multiple bands
  - "on-ice" (2$): keep data stored, basic public info, but no 
- stripe connect
  - split sheets: gig payout splits ("van fund", manager, bandmembers)
  - insta payouts
- magic links (no account required)
  - everything is online and not exported
  - confirm button for stage hand when they received your stuff
  - guest list bot: members get specific links to send to friends, so everyone knows who invited whom. auto close 2 hours before doors
- stage planner
  - draw your tech rider
  - inputs/outputs list
  - lists the most known gear & links to forums for any faults
  - power & cable estimator, optimizer
- advancing
  - ckecklist bot auto sends links
    - venue has not confirmed load-in/soundcheck times
  - weather & traffic alerts ("heavy rain in XY")



## Built-in ControllerBase Result Methods

### 2xx Success
Ok()                        // 200 with no body
Ok(value)                   // 200 with body
Created(uri, value)         // 201 with Location header
CreatedAtAction(            // 201 with Location pointing to another action
    nameof(GetById), 
    new { id = 1 }, 
    value)
NoContent()                 // 204 — success but nothing to return, common for DELETE
Accepted()                  // 202 — request accepted but processing async

### 4xx Client Errors

BadRequest()                // 400 — invalid request
BadRequest(modelState)      // 400 with validation errors
BadRequest(new { error = "message" })  // 400 with custom error object
Unauthorized()              // 401 — not logged in
Forbid()                    // 403 — logged in but not allowed
NotFound()                  // 404
NotFound(new { error = "message" })    // 404 with body
Conflict()                  // 409 — e.g. duplicate resource
UnprocessableEntity()       // 422 — request is valid but business rules failed

### 5xx Server Errors
StatusCode(500)             // generic, avoid if possible
Problem("message")          // 500 with RFC 7807 problem details format



## EF Query Filters

Here are practical EF Core query examples using BandTools entities so everything is familiar.

## Basic Queries

```csharp
// Get all bands — translated to SELECT * FROM Bands WHERE IsDeleted = 0
var bands = await db.Bands.ToListAsync();

// Get one by id
var band = await db.Bands.FindAsync(id);

// Get one with a condition
var band = await db.Bands.FirstOrDefaultAsync(b => b.Name == "Metallica");

// Check existence without loading the entity — more efficient than fetching it
var exists = await db.Bands.AnyAsync(b => b.Name == "Metallica");

// Count
var trackCount = await db.Tracks.CountAsync(t => t.BandId == 1);
```

## Filtering

```csharp
// Simple where
var finishedTracks = await db.Tracks
    .Where(t => t.Status == TrackStatus.Finished)
    .ToListAsync();

// Multiple conditions
var slowFinishedTracks = await db.Tracks
    .Where(t => t.Status == TrackStatus.Finished && t.BPM < 100)
    .ToListAsync();

// Contains — translates to SQL IN (...)
var statuses = new[] { TrackStatus.Demo, TrackStatus.InProgress };
var activeTracks = await db.Tracks
    .Where(t => statuses.Contains(t.Status))
    .ToListAsync();

// String search — translates to SQL LIKE '%metal%'
var bands = await db.Bands
    .Where(b => b.Genre != null && b.Genre.Contains("metal"))
    .ToListAsync();

// Case insensitive search
var bands = await db.Bands
    .Where(b => b.Name.ToLower().Contains(searchTerm.ToLower()))
    .ToListAsync();
```

## Ordering and Paging

```csharp
// Order by single field
var tracks = await db.Tracks
    .OrderBy(t => t.Title)
    .ToListAsync();

// Order descending
var albums = await db.Albums
    .OrderByDescending(a => a.ReleaseDate)
    .ToListAsync();

// Order by multiple fields
var members = await db.Members
    .OrderBy(m => m.Name)
    .ThenByDescending(m => m.Id)
    .ToListAsync();

// Paging — essential for list endpoints
int page = 1;
int pageSize = 20;

var tracks = await db.Tracks
    .OrderBy(t => t.Title)
    .Skip((page - 1) * pageSize)   // skip previous pages
    .Take(pageSize)                 // take only this page
    .ToListAsync();
```

## Loading Related Data (Joins)

EF handles joins through Include — you describe what to load, EF writes the JOIN:

```csharp
// Load band with its members
var band = await db.Bands
    .Include(b => b.Members)
    .FirstOrDefaultAsync(b => b.Id == id);

// Load band → members → member details (two levels deep)
var band = await db.Bands
    .Include(b => b.Members)
        .ThenInclude(bm => bm.Member)
    .FirstOrDefaultAsync(b => b.Id == id);

// Load multiple relationships at once
var band = await db.Bands
    .Include(b => b.Members)
        .ThenInclude(bm => bm.Member)
    .Include(b => b.Albums)
        .ThenInclude(a => a.AlbumTracks)
            .ThenInclude(at => at.Track)
    .Include(b => b.Setlists)
    .FirstOrDefaultAsync(b => b.Id == id);
```

## Filtered Includes

New in EF Core 5 — filter what gets included rather than loading everything:

```csharp
// Only include active band members
var band = await db.Bands
    .Include(b => b.Members.Where(bm => bm.LeaveDate == null))
        .ThenInclude(bm => bm.Member)
    .FirstOrDefaultAsync(b => b.Id == id);

// Only include finished tracks on the album
var album = await db.Albums
    .Include(a => a.AlbumTracks)
        .ThenInclude(at => at.Track)
    .Select(a => new
    {
        a.Title,
        Tracks = a.AlbumTracks
            .Where(at => at.Track.Status == TrackStatus.Finished)
            .OrderBy(at => at.TrackNumber)
    })
    .FirstOrDefaultAsync(a => a.Id == id);
```

## Projections with Select

Instead of loading full entities, project to only the fields you need. This is more efficient — EF generates a SELECT with only those columns:

```csharp
// Project to an anonymous type
var trackTitles = await db.Tracks
    .Where(t => t.BandId == 1)
    .Select(t => new { t.Id, t.Title, t.DurationSeconds })
    .ToListAsync();

// Project directly to a DTO
var trackDtos = await db.Tracks
    .Where(t => t.BandId == 1)
    .Select(t => new TrackDto
    {
        Id = t.Id,
        Title = t.Title,
        Status = t.Status,
        BPM = t.BPM
    })
    .ToListAsync();

// Project with related data — no Include needed when using Select
var setlistDtos = await db.Setlists
    .Where(s => s.BandId == 1)
    .Select(s => new SetlistDto
    {
        Id = s.Id,
        Name = s.Name,
        Venue = s.Venue,
        Tracks = s.SetlistTracks
            .OrderBy(st => st.Position)
            .Select(st => new SetlistTrackDto
            {
                TrackId = st.TrackId,
                Title = st.Track.Title,
                Position = st.Position
            })
            .ToList()
    })
    .ToListAsync();
```

This last pattern — projecting to DTOs directly in the query — is worth using over Include when you know exactly what shape you need. It produces leaner SQL and skips loading fields you'll never use.

## Aggregations

```csharp
// Total duration of all tracks in a setlist in seconds
var totalDuration = await db.SetlistTracks
    .Where(st => st.SetlistId == 1)
    .SumAsync(st => st.Track.DurationSeconds ?? 0);

// Average BPM of a band's tracks
var avgBpm = await db.Tracks
    .Where(t => t.BandId == 1 && t.BPM != null)
    .AverageAsync(t => (double)t.BPM!);

// Count tracks per status — GroupBy
var tracksByStatus = await db.Tracks
    .Where(t => t.BandId == 1)
    .GroupBy(t => t.Status)
    .Select(g => new
    {
        Status = g.Key,
        Count = g.Count()
    })
    .ToListAsync();

// Most used tracks across all setlists
var popularTracks = await db.SetlistTracks
    .GroupBy(st => st.TrackId)
    .Select(g => new
    {
        TrackId = g.Key,
        TimesPlayed = g.Count()
    })
    .OrderByDescending(x => x.TimesPlayed)
    .Take(10)
    .ToListAsync();
```

## Raw SQL for Complex Queries

When EF's query translation isn't enough, you can drop to raw SQL while still getting entities back:

```csharp
// Raw SQL that returns entities
var tracks = await db.Tracks
    .FromSqlRaw("SELECT * FROM Tracks WHERE BPM BETWEEN {0} AND {1}", 80, 120)
    .ToListAsync();

// You can still chain LINQ after FromSqlRaw
var tracks = await db.Tracks
    .FromSqlRaw("SELECT * FROM Tracks WHERE BPM BETWEEN {0} AND {1}", 80, 120)
    .Where(t => t.Status == TrackStatus.Finished)
    .OrderBy(t => t.Title)
    .ToListAsync();
```

## Tracking vs No Tracking

```csharp
// Tracked — EF watches for changes, needed if you'll update the entity
var band = await db.Bands.FirstOrDefaultAsync(b => b.Id == id);
band.Name = "New Name";
await db.SaveChangesAsync(); // EF knows band changed, generates UPDATE

// Not tracked — faster, use for read-only queries
var bands = await db.Bands
    .AsNoTracking()
    .ToListAsync();

// Split queries — for complex includes that produce large result sets.
// Instead of one giant JOIN, EF runs separate queries per include.
// Faster when the JOIN would multiply rows significantly.
var band = await db.Bands
    .Include(b => b.Tracks)
    .Include(b => b.Albums)
    .AsSplitQuery()
    .FirstOrDefaultAsync(b => b.Id == id);
```

## Explicit Loading

Sometimes you want to load related data after the fact rather than upfront with Include:

```csharp
// Load the band first
var band = await db.Bands.FindAsync(id);

// Then load its tracks only if needed
await db.Entry(band)
    .Collection(b => b.Tracks)
    .LoadAsync();

// Load a single reference
await db.Entry(track)
    .Reference(t => t.Band)
    .LoadAsync();
```

## A Key Mental Model

EF queries are lazy by default — nothing hits the database until you materialise the query with `ToListAsync()`, `FirstOrDefaultAsync()`, `AnyAsync()` etc. Until then you're just building an expression tree:

```csharp
// No database call yet — just building the query
var query = db.Tracks
    .Where(t => t.BandId == 1)
    .OrderBy(t => t.Title);

// Conditionally add more filters in application logic
if (statusFilter.HasValue)
    query = query.Where(t => t.Status == statusFilter.Value);

if (searchTerm != null)
    query = query.Where(t => t.Title.Contains(searchTerm));

// NOW it hits the database — one query with all filters combined
var tracks = await query.ToListAsync();
```