import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../providers/sharedService';
import { MatDialog } from '@angular/material';
import { DialogComp } from '../dialog/dialog.comp';
import * as firebase from "firebase";


@Component({
    selector: 'input-field',
    templateUrl: './input.comp.html',
    styleUrls: ['./input.style.css'],
})
export class InputComponent implements OnInit {

    constructor(public ss: SharedService, public dialog: MatDialog) { }

    public title: string = 'app';
    public val: any;
    public editedVal: string;
    public arr: [string, { val: string, edit: boolean }][] = [];

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        firebase.database().ref("items").on("value", (obj) => {
            console.log("Initial State", obj.val() && Object.entries(obj.val()));
            this.arr = obj.val() ? Object.entries(obj.val()) : [];
        }
        )
        // this.arr = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
    }

    public put(): void {
        if (this.val) {
            // this.arr.push({
            //     val: this.val,
            //     edit: false
            // });
            // localStorage.setItem("todo", JSON.stringify(this.arr))
            firebase.database().ref("items").push({
                val: this.val,
                edit: false
            }).then(() => this.val = "")

        }
        else {
            this.ss.showSnackBar("You can't add empty field")
        }
    }
    public del(i: number): void {
        // this.arr.splice(i, 1)
        // localStorage.setItem("todo", JSON.stringify(this.arr))
        firebase.database().ref("items/" + this.arr[i][0]).remove()
    }
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
    public edited(i: number): void {
        if (this.editedVal) {
            // this.arr[i][1] = { val: this.editedVal, edit: false };
            // localStorage.setItem("todo", JSON.stringify(this.arr))
            firebase.database().ref("items/" + this.arr[i][0]).set({
                val: this.editedVal,
                edit: false
            })
        }
        else {
            this.ss.showSnackBar("You can't add empty field")
        }
    }

    // Mat Dialog
    openDialog(i: number, name: string): void {
        const dialogRef = this.dialog.open(DialogComp, {
            width: '250px',
            data: { name: name, action: i }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            if (result.name === "Delete") {
                this.del(result.action);
            }
            else {
                this.edited(result.action);
            }
        });
    }
}
