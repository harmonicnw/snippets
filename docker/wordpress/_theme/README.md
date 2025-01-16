# [name of site]

### URLs

[production URL] (production)
[staging URL] (staging)

### Git

[git repo URL]

## Setup

### Clone repo

0. `git clone [SSH repo url] [project-name]`
0. `cd [project-name]`
0. `git checkout develop`

### Configure site files

0. `cp _dev_assets/.htaccess-sample .htaccess`
0. `cp _dev_assets/movefile-sample.yml movefile.yml`

### Configure Docker

0. `cp wp-config-sample-docker.php wp-config.php`
0. `cp _dev_assets/.env-sample .env`
0. modify .env: add your git email, name and text editor preference
0. `docker compose build`
0. `docker compose up` (optionally add -d for detached mode)
0. Go to http://localhost:8080 and you should see a WordPress setup page. Do not set up the WordPress install now—you will pull down data from the production environment instead.

Run subsequent commands in the Docker instance.

### Pull site data

0. `wordmove pull -du -e production`

### Install dependencies

0. `cd wp-content/themes/[theme-name]`
0. `yarn`

## Development

### Docker start

0. `docker compose up` (add --build to rebuild)
0. View site at http://localhost:8080

### Compile assets in development mode (JavaScript, CSS, fonts, images)

0. `cd wp-content/themes/[theme-name]`
0. `yarn start`

As you make changes to CSS and JavaScript files, the files should automatically compile from assets/ to dist/ so long as the yarn process is still running. Refresh your browser to view changes.

### Build assets

To simply do a one-off build of the site assets, you can run:

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