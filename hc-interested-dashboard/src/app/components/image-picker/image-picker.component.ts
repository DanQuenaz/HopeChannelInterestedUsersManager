import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string | ArrayBuffer | null>();
  
  imageUrl: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor() {}

  ngOnInit(): void {
    this.previewUrl = 'assets/default.jpg';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onUrlEntered(): void {
    if (this.imageUrl && this.imageUrl.startsWith('http')) {
      this.previewUrl = this.imageUrl;
    } else {
      this.previewUrl = 'assets/default.jpg';
    }
  }

  isValidImageUrl(): boolean {
    return this.previewUrl !== 'assets/default.jpg' && this.previewUrl !== null;
  }

  useSelectedImage(): void {
    if(this.isValidImageUrl()) { 
      this.sendMessage(this.previewUrl);
    }
  }

  close(): void {
    this.sendMessage(null);
  }
  sendMessage(message: string | ArrayBuffer | null): void {
    this.messageEvent.emit(message);
  }
}
