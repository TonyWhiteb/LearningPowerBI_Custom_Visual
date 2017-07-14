 # LearningPowerBI_Custom_Visual
The path I learn to create Power BI_Custom_Visual
## Preparation
1. Install [Node.js](https://nodejs.org/en/download/) (64-bit or 32-bit)
2. Install [GIT](https://git-scm.com/download)
3. Install [Visual Studio Code](https://code.visualstudio.com/download)
4. Install [Fiddler](https://www.telerik.com/download/fiddler) 
## Developing Custom Visuals with the Power BI Developer Tools
### Install the Power BI Custom Visual Tool (PBIVIZ)
1. Launch the Node.js command prompt
2. Go to the your folder `cd yourfolderpath`
3. Execute `npm install -g powerbi-visuals-tools`
4. Install a self-signed SSL certificate for the SSL address of https://localhost `pbiviz --install-cert`
### Set up D3 library
1. Go to your custom visual folder
2. Execute `npm install d3@3 -save-dev`
3. Go to __package.json__ to check if this installation is succeeded
4. Open __pbiviz.json__ and locate __externalJS__
5. Update the array for the __externalJS__ setting by adding the __path__ to __d3.js__
### Set up Typescript
1. Return to the Node.js command prompt
2. Execute `npm install @types/d3@3 --save`
3. Opern __tsonfig.json__ and locate __files__
4. Update the array for the __tsonfig.json__ setting by adding the __path__ to __index.d.ts__
### Set up Dataviewutils
1. Return to the Node.js command prompt
2. Execute `npm install powerbi-visuals-utils-dataviewutils --save`
3. Opern __tsonfig.json__ and locate __files__
4. Update the array for the __tsonfig.json__ setting by adding the __path__ to __index.d.ts__
5. Open __pbiviz.json__ and locate __externalJS__
6. Update the array for the __externalJS__ setting by adding the __path__ to __index.js__
## Hello World!
1. Return to Node.js command prompt
2. Execute `md CustomVisuals` to create a folder for your practice, and then cd to that folder
3. Execute `pbiviz new firstVisual` to create your first visual
4. Execute `npm install` to install the Power BI Custom Visual frame (my understanding)
5. Execute `code .` to open Visual Studio Code
6. Go to firstVisual/src/visuals.ts and you will see the default code for this new visual
7. Go back to Node.js command prompt and execute `pbiviz start`
8. Log into your Power BI at https://app.PowerBi.com
9. Select the __Setting__ menu command to enable __developer visual for testing__ under __Developer__
10. Now you can add your first visual in your report and see it.''
