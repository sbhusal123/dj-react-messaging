## Dj React Realtime Messaging:

Runing application: ``docker compose up --build`` after this, wait till the completion of ``yarn`` inside docker container.

> Packages Installation
```sh
frontend-1    | Installing yarn packages...
frontend-1    | Please wait untill completion..
```

Wait untill you get:
```sh
frontend-1    | [3/4] Linking dependencies...
frontend-1    | [4/4] Building fresh packages...
frontend-1    | Done in 75.02s.
frontend-1    | Yarn install completed successfully.
frontend-1    | Starting the frontend...
frontend-1    | yarn run v1.22.22
frontend-1    | $ vite --host 0.0.0.0 --port 3000
frontend-1    | 
frontend-1    |   VITE v5.4.2  ready in 107 ms
frontend-1    | 
frontend-1    |   ➜  Local:   http://localhost:3000/
frontend-1    |   ➜  Network: http://172.19.0.4:3000/
```


Now the application should be accessible on: ``http://localhost:3000``
