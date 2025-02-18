# Gulp-based Template for Static Frontend Projects

This project is a template for creating static frontend projects using Gulp. It provides a ready-made structure and a set of tools for automating development tasks.

## Table of Contents

1. [Project Description](#project-description)
2. [Project Structure](#project-structure)
3. [Installation and Setup](#installation-and-setup)
4. [Usage](#usage)
5. [Available Commands](#available-commands)
6. [Additional Information](#additional-information)

## Project Description

This template is designed for quickly deploying static websites. It includes a configured Gulp setup for automating build, development, and resource optimization tasks. Key features include SCSS to CSS compilation, JavaScript bundling, image optimization, and a local development server.

## Project Structure

```
gulp-core/
├── gulp/
│   ├── tasks/
│   │   ├── styles.js
│   │   ├── scripts.js
│   │   ├── images.js
│   │   ├── html.js
│   │   └── serve.js
│   ├── config.js
│   └── utils.js
├── src/
│   ├── scss/
│   │   └── main.scss
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── index.pug
├── .editorconfig
├── .gitignore
├── .prettierrc
├── gulpfile.js
├── package.json
└── README.md
```

- `gulp/`: Folder containing Gulp settings and tasks.
  - `tasks/`: Individual files for each Gulp task (styles, scripts, images, HTML, server).
  - `config.js`: Configuration file with paths and parameters.
  - `utils.js`: Helper functions for Gulp tasks.
- `src/`: Source files of the project.
  - `scss/`: Folder containing SCSS files.
  - `js/`: Folder containing JavaScript files.
  - `images/`: Folder for storing images.
  - `index.pug`: Main Pug template file.
- `.editorconfig`: Configuration file to maintain consistent coding styles.
- `.gitignore`: List of files and folders ignored by Git.
- `.prettierrc`: Prettier formatting configuration.
- `gulpfile.js`: Main Gulp configuration file that connects tasks from `gulp/tasks`.
- `package.json`: Project file containing dependencies and metadata.
- `README.md`: Project documentation.

## Description of `/gulp/tasks/` Files

Each file in this folder is responsible for executing a specific task in the project build process.

- **`styles.js`** – Compiles SCSS to CSS, adds prefixes, and minifies the output.
- **`scripts.js`** – Bundles JavaScript files, minifies, and merges them.
- **`images.js`** – Optimizes images (compresses PNG, JPEG, SVG, etc.).
- **`html.js`** – Compiles Pug into HTML.
- **`serve.js`** – Starts a local development server with live reload.

These files are included in `gulpfile.js` and are used during the project build. If you need to add a new task, create a file in this folder and connect it to `gulpfile.js`.

## Installation and Setup

To start working with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KikelDmitry/gulp-core.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd gulp-core
   ```

3. **Install dependencies:** Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then run:
   ```bash
   npm install
   ```

## Usage

After installing dependencies, the following commands are available:

- **Build the project:** Runs compilation and optimization of all resources for production.
  ```bash
  npm run build
  ```

- **Start the development server:** Launches a local server with live reloading when files change.
  ```bash
  npm run dev
  ```

## Available Commands

In `package.json`, the following scripts are defined:

- `build`: Runs the `build` task from `gulpfile.js`, performing a full project build.
- `dev`: Runs the `serve` task, starting the local server and watching for file changes.

## Additional Information

- **Gulp:** Task automation tool for development. [Official site](https://gulpjs.com/)
- **Pug:** Templating engine for Node.js. [Documentation](https://pugjs.org/api/getting-started.html)
- **SCSS:** CSS preprocessor. [Documentation](https://sass-lang.com/documentation)

This template is designed to speed up static website development, providing a ready-to-use setup for building and development. You can customize it to fit your needs by adding or modifying Gulp tasks as required.

