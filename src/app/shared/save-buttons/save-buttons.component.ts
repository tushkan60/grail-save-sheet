import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-buttons',
  templateUrl: './save-buttons.component.html',
  styleUrls: ['./save-buttons.component.css'],
})
export class SaveButtonsComponent {
  @Output() saveClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() gameId!: string;
  onSave() {
    this.saveClicked.emit();
  }

  onUpdate() {
    this.updateClicked.emit();
  }
}
