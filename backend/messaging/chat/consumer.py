import json

from channels.consumer import AsyncConsumer


class ChatConsumer(AsyncConsumer):


    async def websocket_connect(self, event):
        user = self.scope["user"]
        await self.channel_layer.group_add(
            "chat_room",
            self.channel_name
        )
        await self.channel_layer.group_send(
            "chat_room",
            {
                "type": "send_message",
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

    async def send_message(self, event):
        message = event["text"]
        await self.send({
            "type": "websocket.send",
            "text": message
        })

    async def websocket_disconnect(self, event):
        user = self.scope["user"]
        await self.channel_layer.group_send(
            "chat_room",
            {
                "type": "send_message",
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
