FROM mysql:5

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE jktnxt
ENV MYSQL_USER users_service
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d