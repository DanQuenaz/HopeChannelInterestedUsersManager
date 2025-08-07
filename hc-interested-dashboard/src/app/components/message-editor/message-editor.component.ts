import { Component, ElementRef, ViewChild, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WahaService } from 'src/app/services/waha.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.scss']
})

export class MessageEditorComponent  implements OnInit, OnDestroy{
  @ViewChild('editorRef') editorRef!: ElementRef<HTMLDivElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private wahaService: WahaService,
              private sanitizer: DomSanitizer
              ) { }

  content: string = '';
  isBold: boolean = false;
  isItalic: boolean = false;
  showPreview: boolean = false;
  previewContent: SafeHtml = '';
  set: '' | 'apple' | 'google' | 'twitter' | 'facebook'  = 'google';

  private savedRange: Range | null = null;


  toggleBold(): void {
    this.isBold = !this.isBold;
    this.formatText('bold');
  }

  toggleItalic(): void {
    this.isItalic = !this.isItalic;
    this.formatText('italic');
  }

  formatText(format: string): void {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = this.content.substring(startPos, endPos);

    if (!selectedText) return;

    let formattedText = '';
    
    switch(format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      default:
        formattedText = selectedText;
    }

    this.content = 
      this.content.substring(0, startPos) + 
      formattedText + 
      this.content.substring(endPos);

    // Reset the formatting buttons after applying
    this.isBold = false;
    this.isItalic = false;
  }

  showPreviewContent(): void {
    this.previewContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
    this.showPreview = true;
  }

  execCommand(command: string, value?: string): void {
    if (command === 'transformList') {
      this.transformToBulletList();
    } else {
      document.execCommand(command, false, value);
    }
    this.focusEditor();
  }

  transformToBulletList(): void {
    const editor = document.getElementById('editor');
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Extract selected text (respecting line breaks)
    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    // Split by actual line breaks
    const lines = selectedText.split('\n').map(line => line.trim()).filter(line => line !== '');

    if (lines.length === 0) return;

    // Convert to bullet list
    const transformedLines = lines.map(line => {
      const cleanLine = line.replace(/^[\-\*•]\s*/, ''); // remove existing bullet if any
      return `- ${cleanLine}`;
    });

    // Join with <br> to ensure line breaks are respected in HTML
    const bulletHTML = transformedLines.join('<br>');

    // Replace selection with bullet list HTML
    const span = document.createElement('span');
    span.innerHTML = bulletHTML;

    range.deleteContents();
    range.insertNode(span);

    // Move cursor to the end
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(editor);
    newRange.collapse(false);
    selection.addRange(newRange);
  }



  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ];

  ngOnInit(): void {
    this.set = 'google';
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if(this.showEmojiPicker) {
      this.saveSelection();
    }
  }

  addEmoji(event: any): void {
    const emoji = event.emoji.native;
    this.showEmojiPicker = false;

    const editor = document.getElementById('editor');
    if (!editor || !this.savedRange) return;

    // Restore the saved selection
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(this.savedRange);

    // Insert emoji
    const emojiNode = document.createTextNode(emoji);
    this.savedRange.deleteContents();
    this.savedRange.insertNode(emojiNode);

    // Move caret after emoji
    this.savedRange.setStartAfter(emojiNode);
    this.savedRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(this.savedRange);

    // Clear saved range
    this.savedRange = null;
  }

  focusEditor(): void {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (textarea) {
      textarea.focus();
    }
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

  saveSelection(): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedRange = selection.getRangeAt(0);
    }
  }


}

