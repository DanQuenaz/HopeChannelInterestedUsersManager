import { Component, ElementRef, ViewChild, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageData } from 'src/app/models/message-data';
import { WahaService } from 'src/app/services/waha.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.scss']
})

export class MessageEditorComponent  implements OnInit, OnDestroy{
  @ViewChild('editorRef') editorRef!: ElementRef<HTMLDivElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private wahaService: WahaService
              ) { }
  
  messageData: MessageData = {
    content: '',
    imageUrl: null,
    videoUrl: null
  };
  messageContent: string = '';
  showEmojiPicker = false;
  imagePickerOpen = false;

  ngOnInit(): void {
  }

  toggleImagePicker(): void {
    this.imagePickerOpen = !this.imagePickerOpen;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any, textArea: HTMLTextAreaElement): void {
    const emoji = event.emoji.native;
    this.showEmojiPicker = false;

    if (!emoji) return;
    if (!textArea) return;

    const end = textArea.selectionEnd;
    const originalText = textArea.value;
    const newText = originalText.substring(0, end) + emoji + originalText.substring(end);
    textArea.value = newText;

    textArea.focus();
    textArea.selectionStart = end + emoji.length;
    textArea.selectionEnd = end + emoji.length;
  }
  

  ngOnDestroy(): void {
  }

  sendMessage(){
    const message =  "this.htmlContent";
    const phoneNumberList = ["553181157588", "553384101019"];

    this.wahaService.sendMessage(message, phoneNumberList);
  }

  clearEditor(){
    
  }

  boldCommand(textArea: HTMLTextAreaElement): void {
    this.execCommand(textArea, '*');
  }

  italicCommand(textArea: HTMLTextAreaElement): void {
    this.execCommand(textArea, '_');
  }

  execCommand(textArea: HTMLTextAreaElement, char: string): void {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    if (start === end) {
      return;
    }

    const originalText = textArea.value;
    const selectedText = originalText.substring(start, end);
    const newText = originalText.substring(0, start) +`${char}${selectedText}${char}` + originalText.substring(end);

    textArea.value = newText;

    textArea.focus();
    textArea.selectionStart = start;
    textArea.selectionEnd = start + selectedText.length + 2;
  }

  bulletListCommand(textArea: HTMLTextAreaElement): void {
    const value = textArea.value;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    // Get start of first line and end of last line in selection
    const beforeSelection = value.slice(0, start);
    const selection = value.slice(start, end);
    const afterSelection = value.slice(end);

    // Find the actual start of the first line
    const lineStartIndex = value.lastIndexOf('\n', start - 1) + 1;
    const lineEndIndex = value.indexOf('\n', end);
    const actualEndIndex = lineEndIndex === -1 ? value.length : lineEndIndex;

    // Get the full selected block of lines
    const linesBlock = value.slice(lineStartIndex, actualEndIndex);
    const lines = linesBlock.split('\n');

    // Add "- " to beginning of each line
    const modifiedLines = lines.map(line => `- ${line}`);
    const modifiedBlock = modifiedLines.join('\n');

    // Build new value
    const newValue =
      value.slice(0, lineStartIndex) +
      modifiedBlock +
      value.slice(actualEndIndex);

    // Update textarea
    textArea.value = newValue;

    // Optional: set cursor or selection back
    const newStart = start + 2; // rough adjustment
    const newEnd = end + 2 * lines.length;
    textArea.selectionStart = newStart;
    textArea.selectionEnd = newEnd;
    textArea.focus();
  }

  receiveImagePickerMessage(event: string | ArrayBuffer | null): void {
    this.imagePickerOpen = false;
    if (event) {
      this.messageData.imageUrl = event;
    }
  }



}

