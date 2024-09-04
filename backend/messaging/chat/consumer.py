import json

from channels.consumer import AsyncConsumer

from channels.db import database_sync_to_async

from core.mixins import TokenValidationMixin

from .models import ChatRoom


class ChatConsumer(AsyncConsumer, TokenValidationMixin):


    @database_sync_to_async
    def remove_user_from_room(self):
        chat_room = ChatRoom.objects.first()
        user = self.scope["user"]
        chat_room.users.remove(user)
        chat_room.save()


    @database_sync_to_async
    def check_user_in_room(self):
        chat_room_count = ChatRoom.objects.count()
        user = self.scope["user"]
        chat_room = None
        if chat_room_count == 0:
            chat_room = ChatRoom.objects.create(room_name="Common Room")
            chat_room.users.add(user)
            chat_room.save()
            return False
        else:
            chat_room = ChatRoom.objects.first()
            if chat_room.users.filter(id=user.id).exists():
                return True
            else:
                chat_room.users.add(user)
                return False

    async def websocket_connect(self, event):
        user = self.scope["user"]
        if not user.is_authenticated:
            await self.send({
                "type": "websocket.close"
            })
        else:
            user_in_room = await self.check_user_in_room()
            
            if user_in_room:
                await self.send({
                    "type": "websocket.close"
                })

            await self.channel_layer.group_add(
                "chat_room",
                self.channel_name
            )
            await self.channel_layer.group_send(
                "chat_room",
                {
                    "type": "user_connected",
                    "text": json.dumps({
                        "type": "user_connect",
                        "data": {
                            "username": user.username,
                            "email": user.email,
                            "id": user.id,
                        }
                    })
                }
            )
            await self.send({
                'type': 'websocket.accept'
            })

    async def chat_message(self, event):
        message = event["text"]
        await self.send({
            "type": "websocket.send",
            "text": message
        })


    async def user_disconnected(self, event):
        text = event['text']
        await self.send({
            "type": "websocket.send",
            "text": text
        })

    async def user_connected(self, event):
        text = event['text']
        await self.send({
            "type": "websocket.send",
            "text": text
        })

    async def websocket_disconnect(self, event):
        print("Websocket Disconnected...", event)
        user = self.scope["user"]
        await self.channel_layer.group_send(
            "chat_room",
            {
                "type": "user_disconnected",
                "text": json.dumps({
                    "type": "user_disconnect",
                    "data": {
                        "username": user.username,
                        "email": user.email,
                        "id": user.id,
                    }
                })
            }
        )
        await self.channel_layer.group_discard(
            "chat_room",
            self.channel_name
        )
        await self.remove_user_from_room()
