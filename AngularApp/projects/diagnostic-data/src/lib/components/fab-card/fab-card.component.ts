import { Component, Input, } from '@angular/core';

@Component({
  selector: 'fab-card',
  templateUrl: "./fab-card.component.html",
  styleUrls: ["./fab-card.component.scss"]
})
export class FabCardComponent {
  @Input() isExpandable: boolean = true;
  @Input() expanded: boolean = true;
  @Input() ariaLabel: string = "";
  get ariaExpaned() {
    if(!this.isExpandable) return null;
    return this.expanded ? "true" : "false";
  }
  toggleExpand() {
    console.log("toggled");
    this.expanded = !this.expanded;
  }
}



