# [name of site]

### URLs

[production URL] (production)
[staging URL] (staging)

### Git

[git repo URL]

## Setup

### Clone repo

1. `git clone [SSH repo url] [project-name]`
1. `cd [project-name]`
1. `git checkout develop`

### Configure site files

1. `cp _dev_assets/.htaccess-sample .htaccess`
1. `cp _dev_assets/movefile-sample.yml movefile.yml`
1. `cp _dev_assets/.env-sample .env`
1. Update .env with your git username and email

### Configure Docker

1. `cp wp-config-sample-docker.php wp-config.php`
1. `cp _dev_assets/.env-sample .env`
1. modify .env: add your git email, name and text editor preference
1. `docker compose build`
1. `docker compose up` (optionally add -d for detached mode)
1. Go to http://localhost:8080 and you should see a WordPress setup page. Do not set up the WordPress install now—you will pull down data from the production environment instead.

Run subsequent commands in the Docker instance.

### Pull site data

1. `wordmove pull -du -e production`

### Install dependencies

1. `cd wp-content/themes/[theme-name]`
1. `yarn`

## Development

### Docker start

1. `docker compose up` (add --build to rebuild)
1. View site at http://localhost:8080

### Compile assets in development mode (JavaScript, CSS, fonts, images)

1. `cd wp-content/themes/[theme-name]`
1. `yarn start`

As you make changes to CSS and JavaScript files, the files should automatically compile from assets/ to dist/ so long as the yarn process is still running. Refresh your browser to view changes.

### Build assets

To do a production-ready build of the site assets, use:

* `yarn build`

### Docker stop

To close docker in detached mode, run:

* `docker compose down`

When running docker in the console, you can cancel the task by pressing control-C.

## Deployment

We use WordMove for site deployments. See WordMove's documentation here:

https://github.com/welaika/wordmove

Example commands:

* `wordmove pull -du -e production` (sync database and uploads from production)
* `wordmove push --all -e preview` (deploy all changes to staging)
* `wordmove push -t -e production` (deploy theme files to production)
* `wordmove push -p -e production` (deploy plugin files to production)

Be sure to run `yarn build` before deploying theme files. This minimizes CSS and JS files whereas `yarn start` does not.