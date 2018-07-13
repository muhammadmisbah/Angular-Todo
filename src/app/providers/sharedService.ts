import { Injectable } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material";
import { DialogComp } from "../component/dialog/dialog.comp";
import { Observable } from "../../../node_modules/rxjs";

@Injectable()
export class SharedService {
    constructor(public snackBar: MatSnackBar, public dialog: MatDialog) { }

    public showSnackBar(text: string, action: string = '', duration: number = 2000): void {
        this.snackBar.open(text, action, {
            duration
        });
    }

    public openDialog(i: number, name: string): Observable<any> {
        const dialogRef = this.dialog.open(DialogComp, {
            width: '250px',
            data: { name: name, action: i }
        });

        return dialogRef.afterClosed()
    }

}
