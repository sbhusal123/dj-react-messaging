# Realtime Messaging

## Stack:
- Backend build with django Rest Framework
- Frontend build with React
- Redis as a channel layer mediator.
- Sqlite DB as a backend database.

## Versioning

```
python=3.12.3
node-20.16
```

## Directory Structure:

```sh
├── backend (Backend Project)
│   ├── Dockerfile
│   ├── env
│   ├── messaging
│   ├── requirements.txt
│   └── start_backend.sh
├── frontend (Frontend Project)
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   ├── README.md
│   ├── src
│   ├── start_frontend.sh
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── yarn.lock
├── docker-compose.yml
```

## Runing a Project:

> docker compose up

```sh
[+] Running 4/4
 ✔ Network messaging_backend_default       Created                                                                                                                0.1s 
 ✔ Container redis-server                  Created                                                                                                                0.0s 
 ✔ Container messaging_backend-frontend-1  Created                                                                                                                0.0s 
 ✔ Container messaging_backend-backend-1   Created                                                                                                                0.0s 
Attaching to backend-1, frontend-1, redis-server
frontend-1    | Installing yarn packages...
frontend-1    | Please wait untill completion..
redis-server  | 1:C 05 Sep 2024 12:26:51.963 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
redis-server  | 1:C 05 Sep 2024 12:26:51.963 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis-server  | 1:C 05 Sep 2024 12:26:51.963 * Redis version=7.4.0, bits=64, commit=00000000, modified=0, pid=1, just started
redis-server  | 1:C 05 Sep 2024 12:26:51.963 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis-server  | 1:M 05 Sep 2024 12:26:51.963 * monotonic clock: POSIX clock_gettime
redis-server  | 1:M 05 Sep 2024 12:26:51.965 * Running mode=standalone, port=6379.
redis-server  | 1:M 05 Sep 2024 12:26:51.965 * Server initialized
redis-server  | 1:M 05 Sep 2024 12:26:51.965 * Ready to accept connections tcp
frontend-1    | yarn install v1.22.22
frontend-1    | [1/4] Resolving packages...
frontend-1    | success Already up-to-date.
frontend-1    | Done in 0.14s.
frontend-1    | Yarn install completed successfully.
frontend-1    | Starting the frontend...
frontend-1    | yarn run v1.22.22
frontend-1    | $ vite --host 0.0.0.0 --port 3000
frontend-1    | 
frontend-1    |   VITE v5.4.2  ready in 123 ms
frontend-1    | 
frontend-1    |   ➜  Local:   http://localhost:3000/
frontend-1    |   ➜  Network: http://172.19.0.3:3000/
backend-1     | System check identified some issues:
backend-1     | 
backend-1     | WARNINGS:
backend-1     | chat.ChatRoom.users: (fields.W340) null has no effect on ManyToManyField.
backend-1     | Operations to perform:
backend-1     |   Apply all migrations: admin, auth, chat, contenttypes, sessions, token_blacklist
backend-1     | Running migrations:
backend-1     |   No migrations to apply.
backend-1     | Watching for file changes with StatReloader
backend-1     | System check identified some issues:
backend-1     | 
backend-1     | WARNINGS:
backend-1     | chat.ChatRoom.users: (fields.W340) null has no effect on ManyToManyField.
backend-1     | 
backend-1     | System check identified 1 issue (0 silenced).
```

## Screenshoot

**Chat Window:**

![Sample](./images/chat_window.png)

