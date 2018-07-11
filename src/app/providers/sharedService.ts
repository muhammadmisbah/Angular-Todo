import { Injectable } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material"

@Injectable()
export class SharedService {
    constructor(public snackBar: MatSnackBar, public dialog: MatDialog) { }

    public showSnackBar(text: string, action: string = 'OK', duration: number = 2000): void {
        this.snackBar.open(text, action, {
            duration
        });
    }
}
