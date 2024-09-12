## Dj React Realtime Messaging:

## 1. Frontend Setup:

Create `frontend/.env` with the sample of `frontend/.env.sample`

To get your host ip:

```sh
hostname -I | awk '${print $1}'

192.168.1.32
```

**Sample: frontend/.env.sample**

```sh
# api URL
VITE_API_URL="http://<host_ip>:8000"

# websocket url
VITE_WS_URL="ws://<host_ip>:8000"
```

## 2. Backend Setup:

Create `backend/.env` with the sample of `backend/.env.sample`

**Sample: backend/.env.sample**

```sh
# TTL for access token ni seconds: default 300
TTL_ACCESS_TOKEN=300

# TTL for refresh token ni seconds: default 1 hours
TTL_REFRESH_TOKEN=3600

```

## 3. Runing An Application


Runing application: ``docker compose up --build`` after this, wait till the completion of ``yarn`` inside docker container.

This should start the backend, frontend and redis containers. It might take a little while for node_modules to get installed properly inside frontend container.

```sh
redis-server  | 1:M 12 Sep 2024 16:09:03.295 * monotonic clock: POSIX clock_gettime
redis-server  | 1:M 12 Sep 2024 16:09:03.297 * Running mode=standalone, port=6379.
redis-server  | 1:M 12 Sep 2024 16:09:03.298 * Server initialized
redis-server  | 1:M 12 Sep 2024 16:09:03.299 * Ready to accept connections tcp
frontend-1    | yarn install v1.22.22
frontend-1    | [1/4] Resolving packages...
frontend-1    | [2/4] Fetching packages...
backend-1     | Operations to perform:
backend-1     |   Apply all migrations: admin, auth, chat, contenttypes, sessions, token_blacklist
backend-1     | Running migrations:
backend-1     |   Applying contenttypes.0001_initial... OK
backend-1     |   Applying auth.0001_initial... OK
backend-1     |   Applying admin.0001_initial... OK
backend-1     |   Applying admin.0002_logentry_remove_auto_add... OK
backend-1     |   Applying admin.0003_logentry_add_action_flag_choices... OK
backend-1     |   Applying contenttypes.0002_remove_content_type_name... OK
backend-1     |   Applying auth.0002_alter_permission_name_max_length... OK
backend-1     |   Applying auth.0003_alter_user_email_max_length... OK
backend-1     |   Applying auth.0004_alter_user_username_opts... OK
backend-1     |   Applying auth.0005_alter_user_last_login_null... OK
backend-1     |   Applying auth.0006_require_contenttypes_0002... OK
backend-1     |   Applying auth.0007_alter_validators_add_error_messages... OK
backend-1     |   Applying auth.0008_alter_user_username_max_length... OK
backend-1     |   Applying auth.0009_alter_user_last_name_max_length... OK
backend-1     |   Applying auth.0010_alter_group_name_max_length... OK
backend-1     |   Applying auth.0011_update_proxy_permissions... OK
backend-1     |   Applying auth.0012_alter_user_first_name_max_length... OK
backend-1     |   Applying chat.0001_initial... OK
backend-1     |   Applying sessions.0001_initial... OK
backend-1     |   Applying token_blacklist.0001_initial... OK
backend-1     |   Applying token_blacklist.0002_outstandingtoken_jti_hex... OK
backend-1     |   Applying token_blacklist.0003_auto_20171017_2007... OK
backend-1     |   Applying token_blacklist.0004_auto_20171017_2013... OK
backend-1     |   Applying token_blacklist.0005_remove_outstandingtoken_jti... OK
backend-1     |   Applying token_blacklist.0006_auto_20171017_2113... OK
backend-1     |   Applying token_blacklist.0007_auto_20171017_2214... OK
backend-1     |   Applying token_blacklist.0008_migrate_to_bigautofield... OK
backend-1     |   Applying token_blacklist.0010_fix_migrate_to_bigautofield... OK
backend-1     |   Applying token_blacklist.0011_linearizes_history... OK
backend-1     |   Applying token_blacklist.0012_alter_outstandingtoken_user... OK
backend-1     | Watching for file changes with StatReloader
frontend-1    | [3/4] Linking dependencies...
frontend-1    | [4/4] Building fresh packages...
frontend-1    | Done in 38.78s.
frontend-1    | yarn run v1.22.22
frontend-1    | $ vite --host 0.0.0.0 --port 3000
frontend-1    | 
frontend-1    |   VITE v5.4.2  ready in 132 ms
frontend-1    | 
frontend-1    |   ➜  Local:   http://localhost:3000/
frontend-1    |   ➜  Network: http://172.18.0.4:3000/
```


Now the application should be accessible on: ``http://localhost:3000``


## 4. Screenshoot

![Chat App](./images/chat_window.png)
