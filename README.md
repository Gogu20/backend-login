- The only dependency is [Docker Engine](https://www.docker.com/)
- To launch the app use this command:
```
docker compose up
```
- I used the **REST Client** VS Code extension for testing, so i also included my *request.rest* file for really quick requests. If you want to test it another way just ignore or delete that file.
- For regstration confirmation emails rename .env-template to just .env and fill in ```EMAIL_SERVICE``` (e.g. Outlook, Gmail, etc.), ```ORG_EMAIL```, which is the email used to send the confirmations, and ```ORG_PASSWORD``` with the password for that email.
- You can choose to save users locally inside an array or inside a dockerized database, the option is set to true by default, you can change it from the .env file.