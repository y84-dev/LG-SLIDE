# Use official Node.js image
#FROM node:18.17.0
FROM node:18-alpine
#WORKDIR /app
#RUN npm install -g npm@9
# Set working directory
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
# Copy your custom theme.
COPY themes ./themes

# Copy your custom extensions.
COPY extensions ./extensions

# Copy your config.
COPY config ./config

# Copy your media.
COPY media ./media

# Copy your public files.
COPY public ./public

# Copy your translations.
COPY translations ./translations


#c	c	keer			RUN npm init
#RUN npm install @evershop/evershop
#RUN rm -f package.json package-lock.json

# Copy your project files into the container
COPY entrypoint.sh .

# Set environment variables
# Install dependencies
RUN npm install swiper@^11
RUN npm install
RUN npm install ./extensions/slide_widget
COPY custom-components/ProductSlider.jsx node_modules/@evershop/evershop/src/components/frontStore/catalog/product/list/ProductSlider.jsx
RUN rm node_modules/@evershop/evershop/src/modules/cms/pages/frontStore/homepage/meta.js
RUN rm node_modules/@evershop/evershop/src/modules/auth/pages/admin/adminLogin/LoginForm.jsx
COPY custom-components/meta.js node_modules/@evershop/evershop/src/modules/cms/pages/frontStore/homepage/meta.js
COPY custom-components/LoginForm.jsx node_modules/@evershop/evershop/src/modules/auth/pages/admin/adminLogin/LoginForm.jsx
# Run setup (which reads env vars set above)
RUN ls node_modules/@evershop/evershop/src/components/frontStore/catalog/product/list/
RUN sed -i 's/128px/90px/g' node_modules/@evershop/evershop/src/modules/cms/pages/admin/all/Logo.jsx

RUN npm run build
# Expose the port your app uses (e.g., 3000)
EXPOSE 3000

# Default command to keep container running
#sxCMD ["npm","run", "start"]
ENTRYPOINT ["./entrypoint.sh"]
