import { Pipe, PipeTransform } from '@angular/core';
import { MessageData } from '../models/message-data';

@Pipe({
  name: 'htmlPreview'
})
export class HtmlPreviewPipe implements PipeTransform {

  transform(value: MessageData, ...args: unknown[]): unknown {
    return null;
  }

}
