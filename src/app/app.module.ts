import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppComponent } from './app.component';
import { InputComponent } from './component/input/input.comp';

/**
 * PROVIDERS
 */
import { SharedService } from './providers/sharedService';
import { DialogComp } from './component/dialog/dialog.comp';
import { FirebaseService } from './providers/firebaseServices';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    DialogComp
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    SharedService,
    FirebaseService
  ],
  entryComponents: [DialogComp],
  bootstrap: [AppComponent]
})
export class AppModule { }
