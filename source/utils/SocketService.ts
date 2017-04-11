import * as socketIo from "socket.io-client";


export class SocketService {
     private _socket;
     private SERVER_URL = "http://localhost:8080";

     public getSocket() {
      if (this._socket === undefined) {
        this.initSocket();
      }
      return this._socket;
    }

    private initSocket(): void {
        this._socket = socketIo(this.SERVER_URL);
    }

}