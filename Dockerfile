# Gebruik een node image om de app te bouwen
FROM node:18-alpine AS build

# Stel de werkdirectory in voor de app
WORKDIR /usr/src/app

# Kopieer de package.json en package-lock.json
COPY package*.json ./

# Installeer de dependencies
RUN npm install

# Kopieer de rest van de applicatie
COPY . .

# Bouw de productieversie van de applicatie
RUN npm run build

# Gebruik een Nginx webserver om de app te serveren
FROM nginx:alpine

# Kopieer de gecompileerde bestanden van de build-fase naar de nginx container
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Stel de juiste poort in
EXPOSE 80

# Start Nginx om de app te serveren
CMD ["nginx", "-g", "daemon off;"]
