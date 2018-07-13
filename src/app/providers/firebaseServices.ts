import { Injectable } from "../../../node_modules/@angular/core";
import * as firebase from "firebase"

@Injectable()
export class FirebaseService {
    public ref: firebase.database.Reference = firebase.database().ref("items")

    public push(data: { val: string, edit: boolean }): firebase.database.ThenableReference {
        return this.ref.push(data);
    }

    public remove(key: string): Promise<any> {
        return this.ref.child(key).remove()
    }

    public removeAll(): Promise<any> {
        return this.ref.remove()
    }

    public set(key: string, data: { val: string, edit: boolean }): Promise<any> {
        return this.ref.child(key).set(data);
    }
}