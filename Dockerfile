# BACKEND
FROM node:12 as backend_builder

WORKDIR /usr/src/project-x/back

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]

# FRONTEND
# DB