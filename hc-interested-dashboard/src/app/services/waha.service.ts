import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WahaService {
  private apiUrl = 'http://localhost:3000/';


  constructor(private http: HttpClient) { }

  sendMessage(message: string, phoneNumberList: string[]): void {
    const payload = phoneNumberList.map(phoneNumber => ({
      chatId: `${phoneNumber}@c.us`,
      reply_to: null,
      text: message,
      linkPreview: true,
      linkPreviewHighQuality: false,
      session: "default"
    }));

    payload.forEach(item => {
      this.http.post(`${this.apiUrl}api/sendText`, item).subscribe();
    });
    
  }
}
