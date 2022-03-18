# API Documentation Dev Guide

## How to write new docs/update existing
### What goes where?
Put your pages in the markdown format into the `src/` folder. Each .md file represents one page in the documentation site. If you'd like to include your page in left sidebar reference it in the `src/.vuepress/config.js`.

### How to ease your work?
Firstly, install [nodejs](https://nodejs.org/en/download/current/). After that open command prompt and install yarn: `npm i -g yarn`.

Now you're all set. To preview the docs in the process of writing run `devserver.bat` or `devserver.sh` in the project folder. It will think for a while and finally display console window with the following message:
```
> VuePress dev server listening at http://localhost:8080/
```
Do not close that window, open your browser and follow the given link (usually [http://localhost:8080/](http://localhost:8080/)).

Document in the browser will reload as you modify the source files.

## Deploying the docs
In order to deploy, as for develoment, you will need nodejs and yarn. And as a one-time setup you need to set up git hooks by running `setuphooks.bat` or `setuphooks.sh` in the project folder.

From that time as soon as you commit something these hooks will build final documentation into the `docs/` folder and add it to your commit. After that you could push your work and - viola - docs site [apidocs.flippingbook.com](http://apidocs.flippingbook.com/) is updated automagically.
