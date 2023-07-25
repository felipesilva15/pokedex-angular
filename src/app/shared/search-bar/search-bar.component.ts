import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() public emitSearch: EventEmitter<string> = new EventEmitter();

  public search(q: string) {
    this.emitSearch.emit(q);
  }
}
