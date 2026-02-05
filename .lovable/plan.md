

## Fix Favicon to Use Site Logo

### Overview
The website currently uses a default favicon. We'll update it to use the Ognjiste Bosansko Grahovo logo (`src/assets/logo.png`) for consistent branding across browser tabs and bookmarks.

### Implementation Steps

1. **Copy the logo to the public directory**
   - Copy `src/assets/logo.png` to `public/favicon.png`
   - This makes the logo accessible as a static asset at the root path

2. **Update index.html**
   - Add an explicit `<link rel="icon">` tag pointing to the new favicon
   - Use PNG format which provides better quality than the default ICO

### Technical Details

The change to `index.html` will add:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

This will be placed in the `<head>` section, ensuring browsers display the Ognjiste logo in:
- Browser tabs
- Bookmarks
- Browser history
- Mobile home screen shortcuts (when saved)

