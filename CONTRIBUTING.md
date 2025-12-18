# Contributing an Example App

Thanks for showcasing what you can build on the Livepeer network BYOC stack. Adding
your app is just a config change so others can fork it and build on top.

## Add your app

1. Fork this repo.
2. Add a new entry to `data/apps.json`.
3. Add a logo under `public/logos` (SVG preferred; keep the same filename you reference in the entry).
4. Run `npm run update-readme` to regenerate the catalog.
5. Make sure your app repo is public and MIT-licensed.
6. Open a pull request.

## App entry schema

```json
{
  "name": "Your app name",
  "tagline": "Short description of what it does",
  "repo": "https://github.com/your-org/your-repo",
  "website": "https://yourapp.com",
  "tags": ["AI", "Workflow"],
  "logo": "/logos/your-logo.svg",
  "status": "community"
}
```

## Guidelines

- Keep taglines under 120 characters.
- Use 2-4 tags from your domain (short, descriptive).
- Logos should be square and high-contrast.
- Example repos should be [MIT-licensed](https://opensource.org/license/mit) to keep reuse simple.
