import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'dialog-comp',
  templateUrl: './dialog.comp.html',
})
export class DialogComp {

  constructor(
    public dialogRef: MatDialogRef<DialogComp>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      action: number;
    }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}