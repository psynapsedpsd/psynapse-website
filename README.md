# PSYNAPSE Website Source

This folder contains the complete current PSYNAPSE psychology club website source, including all page components, games, public images, and GitHub Pages deployment workflow.

## Open and run in Visual Studio Code

1. Extract this ZIP file.
2. In Visual Studio Code, choose **File → Open Folder** and select the extracted `psynapse-website-source` folder.
3. Install [Node.js 20 LTS](https://nodejs.org/) if it is not already installed.
4. Open the VS Code terminal (**Terminal → New Terminal**) and run:

   ```bash
   npm ci
   npm run dev
   ```

5. Open the local address Vite prints in the terminal, usually `http://localhost:5173`.

To check types and make a production build:

```bash
npm run typecheck
npm run build
npm run preview
```

## Change a leadership portrait

Replace an image in `public/images/leaders/` while keeping its existing filename, or update the matching `image` path in `src/components/Team.tsx`:

- `saanchi-yadav.jpeg`
- `nikhil-dev.jpeg`
- `aditi-vashisht.jpeg`

## Publish to GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and publishes the site when you push to `main`.

1. Create a GitHub repository and push the contents of this folder to its `main` branch.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Check the **Actions** tab for the deployment result.

The workflow handles repository subpaths and direct refreshes of `/gallery` and `/counselling`.

## Note about counselling requests

The counselling page is included, but its current form does not send requests to a counsellor. The page explains this to visitors.
