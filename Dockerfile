# Gebruik een officiële Node.js runtime als basis image
FROM node:18-alpine

# Stel de werkdirectory in voor de app
WORKDIR /usr/src/app

# Kopieer package.json en package-lock.json (of yarn.lock) naar de werkdirectory
COPY package*.json ./

# Installeer de dependencies
RUN npm install

# Kopieer de rest van de applicatie
COPY . .

# Stel het commando in om je app te starten
CMD ["npm", "start"]

# Stel de poort in die de container gebruikt
EXPOSE 3000
