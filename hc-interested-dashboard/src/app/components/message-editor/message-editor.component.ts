import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.scss']
})
export class MessageEditorComponent {
  @ViewChild('editorRef') editorRef!: ElementRef<HTMLDivElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  private savedRange: Range | null = null;

  saveSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedRange = selection.getRangeAt(0);
    }
  }

  restoreSelection() {
    if (this.savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.savedRange);
    }
  }

  format(command: string) {
    this.restoreSelection();
    document.execCommand(command, false);
  }

  sendMessage(){

  }

  clearEditor(){
    
  }

}

