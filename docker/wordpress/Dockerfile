# VERSION 2025.05.07

FROM wordpress:php8.4

# Here we define a few arguments to the Dockerfile. Specifically, the
# user, user id and group id for a new account that we will use to work
# as within our container.
ARG USER=docker
ARG UID=1000
ARG GID=1000
ARG GIT_USER_NAME
ARG GIT_USER_EMAIL
ARG GIT_CORE_EDITOR

# Update Advanced Package Tool packages
RUN apt-get update

# Install required build tools for compiling native dependencies
RUN apt-get install -y \
    build-essential \
    automake \
    autoconf \
    libtool \
    pkg-config

# Set up a non-root user with sudo access.
RUN groupadd --gid $GID $USER \
    && useradd -s /bin/bash --uid $UID --gid $GID -m $USER \
    && apt-get install -y sudo \
    && echo "$USER ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USER \
    && chmod 0440 /etc/sudoers.d/$USER

# Add Docker User to Apache User Group
RUN usermod -a -G www-data $USER

# Install Git
RUN apt-get install -y git

# Configure Git global user config from .env
RUN git config --global user.name "$GIT_USER_NAME"
RUN git config --global user.email "$GIT_USER_EMAIL"
RUN git config --global core.editor "$GIT_CORE_EDITOR"

# Designate web root as safe directory
RUN git config --global --add safe.directory /var/www/html

# Install Git Flow
RUN apt-get install git-flow

# Install VIM
RUN apt-get install -y vim

# Install WGET
RUN apt-get install -y wget

# Install SUDO
RUN apt-get -y install sudo

# Install RSync
RUN apt-get -y install rsync

# This version of the WP Docker Image Comes with OpenSSL 3 but Ruby needs OpenSSL 1.1, so install it
# Based off: https://deanpcmad.com/2022/installing-older-ruby-versions-on-ubuntu-22-04/
RUN wget https://www.openssl.org/source/openssl-1.1.1g.tar.gz && \
    tar zxvf openssl-1.1.1g.tar.gz && \
    cd openssl-1.1.1g && \
    ./config --prefix=/usr/local/bin/openssl-1.1.1g --openssldir=/usr/local/bin/openssl-1.1.1g && \
    make && \
    make install && \
    rm -rf /usr/local/bin/openssl-1.1.1g/certs && \
    ln -s /etc/ssl/certs /usr/local/bin/openssl-1.1.1g/certs

# Install Ruby (Debian's Version Doesn't Work)
RUN wget -O ruby-install-0.8.4.tar.gz https://github.com/postmodern/ruby-install/archive/v0.8.4.tar.gz
RUN tar -xzvf ruby-install-0.8.4.tar.gz
RUN cd ruby-install-0.8.4/ && sudo make install
RUN ruby-install --system ruby 2.6.10 -- --with-openssl-dir=/usr/local/bin/openssl-1.1.1g

# Install zeitwerk (needed for Ruby 2.6)
RUN gem install zeitwerk -v 2.6.18

# Specify version of concurrent-ruby (v1.3.5 was causing issues)
RUN gem install concurrent-ruby -v 1.3.4

# Install older version of ActiveSupport (newer versions not compatible with Ruby 2.6)
RUN gem install activesupport -v 5.2.8

# Install Wordmove and required Wordmove gems
RUN gem install wordmove
RUN gem update wordmovegem
RUN gem install ed25519 -v 1.3.0
RUN gem install bcrypt_pbkdf

# Install the mysql CLI client
RUN apt-get install -y default-mysql-client

# Install WP CLI
RUN curl -o /bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x /bin/wp

# # Install npm
# RUN apt-get update && apt-get install -y nodejs npm

# Install Node.js 18.20 and a compatible version of npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@9

# Install Yarn
RUN npm install -g yarn

# Install SSH Client
RUN apt-get install -y openssh-client
RUN mkdir -p /home/$USER/.ssh
RUN chown -R $USER:$USER /home/$USER/.ssh

# Install imagemagick
RUN apt install -y imagemagick

# Install nano and make default editor
RUN apt install nano

# Install tzdata and set the timezone to Los Angeles
RUN apt-get install -y tzdata && \
    ln -fs /usr/share/zoneinfo/America/Los_Angeles /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# Use the non-root user to log in as into the container.
USER ${UID}:${GID}

# Fix conflict with webpack and node
RUN echo "\n# Fix conflict with webpack and node\nexport NODE_OPTIONS=--openssl-legacy-provider" >> ~/.bashrc