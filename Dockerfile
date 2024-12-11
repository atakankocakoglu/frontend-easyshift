# Stage 1: Build the app
FROM node:18-alpine AS build

# Stel de werkdirectory in
WORKDIR /usr/src/app

# Kopieer de package.json en package-lock.json
COPY package*.json ./

# Installeer de afhankelijkheden
RUN npm install

# Kopieer de rest van de broncode naar de container
COPY . .

# Bouw de app voor productie
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Kopieer de gecompileerde bestanden van de build-fase naar de Nginx container
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Stel de juiste poort in
EXPOSE 80
