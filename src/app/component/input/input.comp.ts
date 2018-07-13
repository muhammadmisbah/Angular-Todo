import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../providers/sharedService';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../../providers/firebaseServices';


@Component({
    selector: 'input-field',
    templateUrl: './input.comp.html',
    styleUrls: ['./input.style.css'],
})
export class InputComponent implements OnInit {

    constructor(public service: SharedService, public dialog: MatDialog, public firebaseService: FirebaseService) { }

    public title: string = 'app';
    public val: any;
    public editedVal: string;
    public arr: [string, { val: string, edit: boolean }][] = [];

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        // importing saved data from database
        this.firebaseService.ref.on("value", (obj) => {
            console.log("Initial State", obj.val() && Object.entries(obj.val()));
            this.arr = obj.val() ? Object.entries(obj.val()) : [];
        }
        )
        // this.arr = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
    }

    // adding method
    public put(): void {
        if (this.val) {
            // this.arr.push({
            //     val: this.val,
            //     edit: false
            // });
            // localStorage.setItem("todo", JSON.stringify(this.arr))

            // adding new task on database
            this.firebaseService.push({ val: this.val, edit: false }).then(
                (res) => res.key ? (this.val = "", console.log(res.key, "res")) : console.log(res)
            )
        }
        else {
            //showing message if input is empty
            this.service.showSnackBar("You can't add empty field")
        }
    }

    // removing method
    public del(i: number): void {
        // this.arr.splice(i, 1)
        // localStorage.setItem("todo", JSON.stringify(this.arr))

        // removing item from database
        this.firebaseService.remove(this.arr[i][0])
    }

    public delAll(): void {
        this.firebaseService.removeAll();
    }

    // showing edit input method
    public edit(i: number): void {
        if (this.arr[i][1].edit) {
            this.arr[i][1].edit = false;
        } else {
            for (let x in this.arr) {
                this.arr[x][1].edit = false;
            }
            this.arr[i][1].edit = true
        }
        this.editedVal = this.arr[i][1].val;
    }

    // edit method
    public edited(i: number): void {
        if (this.editedVal) {
            // this.arr[i][1] = { val: this.editedVal, edit: false };
            // localStorage.setItem("todo", JSON.stringify(this.arr))

            // set edited task on database
            this.firebaseService.set(this.arr[i][0], { val: this.editedVal, edit: false })
        }
        else {
            this.service.showSnackBar("You can't add empty field")
        }
    }

    // Mat Dialog
    confirmation(i: number, name: string): void {
        this.service.openDialog(i, name).subscribe(result => {
            // console.log('The dialog was closed');
            if (result.name === "Delete") {
                this.del(result.action);
            }
            else if (result.action === -1) {
                this.delAll()
            }
            else {
                this.edited(result.action);
            }
        });
    }
}
