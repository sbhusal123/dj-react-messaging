# Realtime Messaging

## 1. Stack:
- Backend build with django Rest Framework
- Frontend build with React
- Redis as a channel layer mediator.
- Sqlite DB as a backend database.

## 2. Versioning

```
python-3.12.3
node-20.16
```

## 3. Directory Structure:

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

## 4. Runing a Project:

### 4.1. Setting up Frontend Environment:

Create `.env` file out of `.env.sample` file located inside `frontend`.

**Sample .env for frontend**

```sh
# ip can be localhost or your machine's network ip
# use $(hostname -I | awk '{print $1}') to get your assigned ip
VITE_API_URL="http://<ip>:3000"
```

Basically ``VITE_API_URL`` this sets the API URL to be used in frontend.

> **Note:** While accessing from mobile device, it needs to be the machine's IP.

### 4.2. Setting up Backend Environment:

Create `.env` file out of `.env.sample` file located inside `frontend`.

**Sample .env for backend**

```sh
# use command below to generate secret key else
# python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
SECRET_KEY='django-insecure-yc2!0fhcf$62ye(adp0btc45g3e7!)oys5r0rw+e82g=#u-ny='

# set to redis if runing in docker, else 127.0.0.1
REDIS_HOST="<redis/127.0.0.1>"

REDIS_PORT="6379"

# comma separated hosts list
ALLOWED_HOSTS="localhost,127.0.0.1,<machine-ip>"

# comma separated origins
# http://<machine-ip>:3000
CORS_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000,http://<machine-ip>:3000"
```

For a local setup,``REDIS_HOST``  should be set to ``localhost`` while on a dockerized setup it should be ``redis``.

## 5. Runing Application Locally

### 5.1. Local Setup For Backend:

> Make sure you have a redis installed on your system if runing locally.

- **Change directory to Backend:** ``cd backend``

- **Create a python environment:** ``python3 -m venv env``

- **Activate virtual environment:** ``source env/bin/activate``

- **Install required packages:** ``pip install -r requirements.txt``

- **Cd into messaging:** ``cd messaging/``

- **Migrate and run server:** ``python manage.py migrate && python manage.py runserver 0.0.0.0:8000``


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

