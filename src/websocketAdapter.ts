import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

export class OpenSocketIoAdapter extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const cors = {
      origin: '*', 
      methods: ['GET', 'POST'],
    };
    return super.createIOServer(port, { ...options, cors });
  }
}
