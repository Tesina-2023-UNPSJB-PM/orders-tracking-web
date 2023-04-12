# Orders Tracking Web

Panel Web de Administración del sistema de tracking de ordenes de servicios

## Stack

- Angular v15.2.0. https://angular.io/
- Clarity (Graphics component library). https://clarity.design/

## Run in Docker

- Comando para creación de imagen (Deploy en NGINX):

  ***docker image build -t orders-tracking-web .***


- Comando para creación de contenedor: 

  ***docker run -p 80:80 -d --name orders-admin-web orders-tracking-web***
