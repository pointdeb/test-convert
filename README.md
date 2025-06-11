### HOW TO RUN PROJECT

```sh
docker compose build
docker compose up
# got to http://localhost
```

### FOR DEV ENVIRONNEMENT

Use vscode devcontainer extension and run project.
The extension will use .devcontainer/docker-compose and automate all stuff for you.

```sh
# inside devcontainer
# to start project
npm start
# got to http://localhost:4200

# to start test
npm run test
```

![Result](./demo.png)
