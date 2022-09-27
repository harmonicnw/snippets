FROM wordpress:latest

# Here we define a few arguments to the Dockerfile. Specifically, the
# user, user id and group id for a new account that we will use to work
# as within our container.
ARG USER=docker
ARG UID=1000
ARG GID=1000
ARG GIT_USER_NAME
ARG GIT_USER_EMAIL

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

# Install and initialize Git Flow
RUN apt-get install git-flow \
    && git flow init -d

# Install VIM
RUN apt-get install -y vim

# Install WGET
RUN apt-get install -y wget

# Install SUDO
RUN apt-get -y install sudo

# Install RSync
RUN apt-get -y install rsync

# Install Ruby (Debian's Version Doesn't Work)
RUN wget -O ruby-install-0.8.4.tar.gz https://github.com/postmodern/ruby-install/archive/v0.8.4.tar.gz
RUN tar -xzvf ruby-install-0.8.4.tar.gz
RUN cd ruby-install-0.8.4/ && sudo make install
RUN ruby-install --system ruby 2.6.10

# Install Wordmove and required Wordmove gems
RUN gem install wordmove
RUN gem update wordmovegem
RUN gem install ed25519
RUN gem install bcrypt_pbkdf

# Install the mysql CLI client.
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
