import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageEditorComponent } from '../message-editor/message-editor.component';

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'address', 'phoneNumber', 'phoneNumberFormated', 'courseOrdered', 'orderDate', 'status', 'responsible'];
  dataSource: Person[] = [];
  isLoading = false;
  selectedFile: File | null = null;
  statusOptions: string[] = ['Interested', 'Not Interested', 'Pending'];

  enableEdit = false;
  rowIdEdit: number = -1;

  constructor(
    private peopleService: PeopleService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.peopleService.getAllPeople().subscribe({
      next: (people) => {
        this.dataSource = people;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading people data:', err);
        this.snackBar.open('Error loading people data', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file first', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.peopleService.updatePeople(this.selectedFile).subscribe({
      next: () => {
        this.snackBar.open('Data updated successfully', 'Close', { duration: 3000 });
        this.loadPeople();
        this.selectedFile = null;
      },
      error: (err) => {
        this.snackBar.open('Error updating data', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  sendMessageToSelected(): void {
    const selectedPeople = this.dataSource.filter(person => person.selected);
    if (selectedPeople.length === 0) {
      this.snackBar.open('Please select at least one person', 'Close', { duration: 3000 });
      return;
    }
    // You'll implement this function
    console.log('Sending message to selected:', selectedPeople);
  }

  sendMessageToAll(): void {
    const messageDialog = this.dialog.open(MessageEditorComponent, {
      width: '60vw',
      height: '50vh',
      panelClass: 'full-screen-dialog',
      data: {}
    });
    messageDialog.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });

    console.log('Sending message to all');
  }

  isAllSelected(): boolean {
    return this.dataSource.every(person => person.selected);
  }

  toggleAllSelection(): void {
    const allSelected = this.isAllSelected();
    this.dataSource.forEach(person => person.selected = !allSelected);
  }

  enableWhatsappNumberEdit(person: Person): void {
    this.enableEdit = true;
    this.rowIdEdit = person.id;
  }

  disableWhatsappNumberEdit(person: Person): void {
    this.enableEdit = false;
    this.rowIdEdit = -1;
    this.updatePerson(person);
  }

  onStatusChange(person: Person): void {
    this.updatePerson(person);
  }

  updatePerson(person: Person): void {
    this.peopleService.updatePerson(person).subscribe({
      next: (updatedPerson) => {
        const index = this.dataSource.findIndex(p => p.id === updatedPerson.id);
        if (index !== -1) {
          this.dataSource[index] = updatedPerson;
          this.snackBar.open('Person updated successfully', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Error updating person:', err);
        this.snackBar.open('Error updating person', 'Close', { duration: 3000 });
      }
    });
  }
}