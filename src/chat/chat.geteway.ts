import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    // cors: {
    //   origin: 'http://localhost:3000', // Убедитесь, что фронт на этом же порту
    //   credentials: true,
    // //   path: 'ws', // Убедитесь, что путь совпадает с клиентским
    // },
  })
  export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
  
    afterInit(server: Server) {
      console.log('WebSocket сервер инициализирован');
    }
  
    handleConnection(client: Socket) {
      console.log(`Клиент подключился: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Клиент отключился: ${client.id}`);
    }
  
    @SubscribeMessage('send_message')
    handleMessage(client: Socket, payload: { message: string, userId: string }) {
      console.log('Получено сообщение:', payload);
      this.server.emit('receive_message', payload); // Отправляем всем
    }
  
    // Пример использования комнат (optional)
    @SubscribeMessage('join_room')
    handleJoinRoom(client: Socket, room: string) {
      client.join(room);
      console.log(`${client.id} присоединился к комнате: ${room}`);
    }
  
    @SubscribeMessage('leave_room')
    handleLeaveRoom(client: Socket, room: string) {
      client.leave(room);
      console.log(`${client.id} покинул комнату: ${room}`);
    }
  }
  