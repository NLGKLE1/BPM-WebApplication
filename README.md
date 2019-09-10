# BPM-WebApplication
Atradius BPM web application
 
## Software

```
Install:
https://nodejs.org/en/
https://code.visualstudio.com/
Plugins: ESLint, SonarLint, GitDiff, Terminal, VS Team Share

(no terminal)
npm install sass -g
npm install typescript -g
npm install @oracle/ojet-cli -g
```

First time after pull
```
cd CM-BPM-OJET-WebApplication
npm install
```

If you have an error running the project
```
run:
npm --add-python-to-path='true' --debug install --global windows-build-tools
manually delete folder:
node_modules
manually delete file:
package-lock.json
run:
npm install
```

Build & Serve the application
```
npm run atradius
OR
npm run atrbuild
npm run atrserve
```

To run the CORS PROXY
```
npm run cors
```

## Work Folders
```
THEME: themes\Atradius\web\Atradius.scss
SCSS: scss\(...)
DC: js\resources\dataControls\{dataControl}.js
TEXTS: js\resources\nls\l10.js (TEXTS FILE)
JS: js\viewModels\rd\{model}.js
HTML: js\views\rd\{view}.html
```

## Unit Testing

http://localhost:8000/tests/index.html

## Maven to war generation
```
// Development
mvn clean -Pdev install
// DevOps
mvn clean install
```
