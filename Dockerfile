FROM node
WORKDIR /restApi
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node","restApi" ]