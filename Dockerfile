FROM mongo:latest

# RUN mongod
CMD [ "show", "dbs" ]