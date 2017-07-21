FROM node:6.11

# RUN mkdir -p /opt/iron  
# WORKDIR /opt/iron  
# VOLUME /opt/iron

# COPY ./docker/node-entrypoint.sh /entrypoint.sh  
# ENTRYPOINT [ "/entrypoint.sh" ]

ADD . /app

# ENV DB_HOST localhost
# ENV DB_DATABASE jktnxt
# ENV DB_USER root
# ENV DB_PASSWORD sembarang
# ENV DB_PORT 3306
# ENV DIRECTORY ./upload
# ENV PORT 3000

# COPY .env /app

RUN cd /app; \
    npm install --production



EXPOSE 3000

# CMD [ "npm", "install" ]

# EXPOSE 8080 

CMD ["node", "/app/index.js"]