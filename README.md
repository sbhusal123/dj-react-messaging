# Realtime Messaging

## 1. Stack:
- Backend build with **Django Rest Framework**
- Frontend build with **React**
- **Redis** as a channel layer mediator.
- **Sqlite DB** as a backend database.

## 2. Versioning:

```
python-3.12.3
node-20.16
```

## 3. Directory Structure:

```sh
├── docker-compose.yml
├── backend
│   ├── Dockerfile
│   ├── .env (backend env)
│   ├── .env.sample (sample env file for backend)
│   ├── messaging
│   ├── requirements.txt
│   └── start_backend.sh
├── frontend
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── .env (frontend env)
│   ├── .env.sample (sample env file for frontend)
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   ├── start_frontend.sh
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── yarn.lock
└── README.md
```

## 4. Environment Variables And Configuration:

We've couple of environment variables to be set to run the frontend and backend properly. Those variables generally controll the exposure of application on external network.

Make sure you know your machine's host ip.

```
> hostname -I | awk '{print $1}'
192.168.1.137
```


### 4.1. Backend Configuration:

Create `.env` inside ``backend`` with the content of ``backend/.env.sample``. Replace values as needed.

**backend/.env.sample**
```sh
# <host-ip>:3000 => required only if exposing externally
ALLOWED_HOSTS="localhost,127.0.0.1,<host-ip>"

# http://<host-ip>:3000 => required only if exposing externally
CORS_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000,http://<host-ip>:3000"

# TTL for access token is 5 minutes (300 in seconds)
TTL_ACCESS_TOKEN=300

# TTL for refresh token is 5 hours (18000 in seconds)
TTL_REFRESH_TOKEN=18000

```

Note that, those values are comma separated. ``http://<host-ip>:3000`` and ``<host-ip>`` are only required if exposing to external network.
TTL envs controll the time to live for the access and refresh token in seconds

Now your copy of ``.env`` file should look something like below.

**backend/.env**
```
ALLOWED_HOSTS="localhost,127.0.0.1,192.168.1.137"
CORS_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000,http://192.168.1.137:3000"

TTL_ACCESS_TOKEN=300
TTL_REFRESH_TOKEN=18000
```

### 4.2. Frontend Configuratio:

Create `.env` inside ``frontend`` with the content of ``frontend/.env.sample``. Replace values as needed.


**frontend/.env.sample**
```sh
# URL can be http://localhost:8000 or http://127.0.0.1:8000 or http://<host_ip>:8000

# api URL
VITE_API_URL="http://<URL>:8000"

# websocket url
VITE_WS_URL="ws://<URL>:8000"
```

Two environment variables here are associated with API URL and the web socket endpoint to be used on react frontend.

Now your copy of ``.env`` file should look something like below.

**frontend/.env**
```sh
VITE_API_URL="http://192.168.1.137:8000"
VITE_WS_URL="ws://192.168.1.137:8000"
```

# 5. Runing Application:

We've a docker compose at the root level, and the associated Dockerfile for backend and frontend in the respective directories. All the entrypoints for runing backend and frontend are in respective directories. 

So, simply runing ``docker compose up --build`` on root directory should spin up **backend**, **frontend**, **redis** containers.

```sh
[+] Running 4/4
 ✔ Network dj-react-messaging_default       Created                                                                                                                           0.1s 
 ✔ Container dj-react-messaging-frontend-1  Created                                                                                                                           0.0s 
 ✔ Container redis-server                   Created                                                                                                                           0.0s 
 ✔ Container dj-react-messaging-backend-1   Created                                                                                                                           0.0s 
Attaching to backend-1, frontend-1, redis-server
redis-server  | 1:C 10 Sep 2024 09:46:28.109 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
redis-server  | 1:C 10 Sep 2024 09:46:28.109 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis-server  | 1:C 10 Sep 2024 09:46:28.109 * Redis version=7.4.0, bits=64, commit=00000000, modified=0, pid=1, just started
redis-server  | 1:C 10 Sep 2024 09:46:28.109 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis-server  | 1:M 10 Sep 2024 09:46:28.110 * monotonic clock: POSIX clock_gettime
redis-server  | 1:M 10 Sep 2024 09:46:28.111 * Running mode=standalone, port=6379.
redis-server  | 1:M 10 Sep 2024 09:46:28.112 * Server initialized
redis-server  | 1:M 10 Sep 2024 09:46:28.112 * Ready to accept connections tcp
frontend-1    | Installing yarn packages...
frontend-1    | Please wait untill completion..
frontend-1    | yarn install v1.22.22
frontend-1    | [1/4] Resolving packages...
frontend-1    | success Already up-to-date.
frontend-1    | Done in 0.12s.
frontend-1    | Yarn install completed successfully.
frontend-1    | Starting the frontend...
frontend-1    | yarn run v1.22.22
frontend-1    | $ vite --host 0.0.0.0 --port 3000
frontend-1    | 
frontend-1    |   VITE v5.4.2  ready in 107 ms
frontend-1    | 
frontend-1    |   ➜  Local:   http://localhost:3000/
frontend-1    |   ➜  Network: http://172.19.0.3:3000/
backend-1     | Operations to perform:
backend-1     |   Apply all migrations: admin, auth, chat, contenttypes, sessions, token_blacklist
backend-1     | Running migrations:
backend-1     |   No migrations to apply.
backend-1     | Watching for file changes with StatReloader
```


## Screenshoot

**Chat Window:**

![Sample](./images/chat_window.png)

