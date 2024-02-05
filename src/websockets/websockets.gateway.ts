import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface MessageData {
  text: string;
}
@WebSocketGateway()
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log('Cliente conectado', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id);
    this.server.emit('user-disconnected', client.id);
  }
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageData,
  ) {
    console.log(data);
    //this.server.emit('message', data);
    client.broadcast.emit('message', data);
  }
}
