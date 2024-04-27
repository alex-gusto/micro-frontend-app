## Micro Frontend Configuration
### Default Hosting Configuration
By default, all micro frontend apps are served from the root URL `(UI_URL=/)` as specified in the `.env` file located at the project root. This setting determines where your micro frontend applications are hosted and accessed.

### Customizing Host Settings for Development
To serve your apps from a different host during development, you will need to modify the `build/importmap-apps.dev.json` file. This file allows you to override the URL for specific apps. Here’s how you can customize the hosting settings:

- Locate the File: Open the `build/importmap-apps.dev.json` file in your project directory.
- Modify the URLs: Change the URLs as needed to point to the appropriate hosts for your apps.

```
{
  "imports": {
    "@mf/mf1/app": "http://localhost:9001/main.js",
    "@mf/mf2/app": "http://localhost:9002/main.js",
    "@mf/board/app": "http://localhost:9003/main.js",
    
    "@mf/mf1": "http://localhost:9001/remoteEntry.js",
    "@mf/mf2": "http://localhost:9002/remoteEntry.js",
    "@mf/board": "http://localhost:9003/remoteEntry.js",
    "@mf/core": "http://localhost:9100/remoteEntry.js",
    "@mf/libs": "http://localhost:9101/remoteEntry.js",
    "@mf/shell": "/remoteEntry.js"
  }
}
```

### On-the-Fly Import Map Changes
You can update the import map configuration on the fly without needing to restart your development server:

- Edit the Configuration: Make the necessary changes to the `build/importmap-apps.dev.json` file.
- Refresh Your Application: Simply refresh your browser to see the updates. The system automatically picks up changes from the modified import map.

### Running in Development Mode
To run React/Redux in dev mode, simply serve the @mf/libs package locally.

- `npm start` - Serve all apps in development mode.
- `npx lerna run start --scope=@mf/mf1 --stream` - Serve a single app.
- `npx lerna run start --scope="@mf/{mf1,mf2,libs}" --parallel --stream` - Serve several apps simultaneously.

### Building
Similarly, it is possible to build all apps or just select ones:

- `npm run build` - Build every app and the core library.
- `npx lerna run build --scope=@mf/mf1 --stream` - Build a single app.
- `npx lerna run build --scope="@mf/{mf1,mf2,board}" --parallel --stream` - Build a list of apps.