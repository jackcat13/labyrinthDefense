from httpd:2.4.41

COPY ./index.html /usr/local/apache2/htdocs/
COPY ./game.html /usr/local/apache2/htdocs/
COPY ./style.css /usr/local/apache2/htdocs/
COPY ./game/* /usr/local/apache2/htdocs/game/
COPY ./game/assets/* /usr/local/apache2/htdocs/game/assets/
COPY ./game/objects/* /usr/local/apache2/htdocs/game/objects/
COPY ./game/objects/images/* /usr/local/apache2/htdocs/game/objects/images/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

USER root
RUN chmod -R 777 /usr/local/apache2/logs

EXPOSE 8080
