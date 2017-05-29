import * as socketIo from "socket.io-client";


export class SocketService {
     private _socket;
     private SERVER_IP;
     private SERVER_PORT;
     private SERVER_URL ;

     constructor(ip, port){
       this.SERVER_IP = ip;
       this.SERVER_PORT = port;
       this.SERVER_URL = this.SERVER_IP + ":" + this.SERVER_PORT;
     }

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