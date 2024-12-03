# Kies een basisafbeelding, bijvoorbeeld een Node.js-afbeelding
FROM node:18

# Zet de werkdirectory
WORKDIR /app

# Kopieer de package.json en package-lock.json eerst (voor caching van dependencys)
COPY package*.json ./

# Installeer de dependencies
RUN npm install

# Kopieer de rest van de applicatiebestanden
COPY . .

# Bouw de applicatie als dat nodig is (bijvoorbeeld voor TypeScript, React, etc.)
RUN npm run build

# Open de poort waarop de app draait
EXPOSE 3000

# Start de applicatie
CMD ["npm", "run", "dev"]
