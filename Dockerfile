# Use lightweight Nginx alpine image
FROM nginx:alpine

# Copy all the static website files to Nginx's default HTML directory
COPY . /usr/share/nginx/html/

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
