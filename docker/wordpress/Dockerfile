FROM wordpress:php8.2

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
    ./config --prefix=$HOME/.openssl/openssl-1.1.1g --openssldir=$HOME/.openssl/openssl-1.1.1g && \
    make && \
    make install && \
    rm -rf ~/.openssl/openssl-1.1.1g/certs && \
    ln -s /etc/ssl/certs ~/.openssl/openssl-1.1.1g/certs

# Install Ruby (Debian's Version Doesn't Work)
RUN wget -O ruby-install-0.8.4.tar.gz https://github.com/postmodern/ruby-install/archive/v0.8.4.tar.gz
RUN tar -xzvf ruby-install-0.8.4.tar.gz
RUN cd ruby-install-0.8.4/ && sudo make install
RUN ruby-install --system ruby 2.7.8 -- --with-openssl-dir=$HOME/.openssl/openssl-1.1.1g

# Install Wordmove and required Wordmove gems
RUN gem install wordmove
RUN gem update wordmovegem
RUN gem install ed25519
RUN gem install bcrypt_pbkdf

# Install the mysql CLI client
RUN apt-get install -y default-mysql-client

# Install WP CLI
RUN curl -o /bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x /bin/wp

# Install Node.js/NPM
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

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

# Use the non-root user to log in as into the container.
USER ${UID}:${GID}

# Fix conflict with webpack and node
RUN echo "\n# Fix conflict with webpack and node\nexport NODE_OPTIONS=--openssl-legacy-provider" >> ~/.bashrc
