import { Component } from '@angular/core';
import { FieldGroup } from '../../models/field-group.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, copyArrayItem, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Element } from '../../models/field-group.model';
import { CalendarModule } from 'primeng/calendar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-field-group',
  standalone: true,
  imports: [FormsModule, CommonModule, DragDropModule, CalendarModule, CdkDrag, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './field-group.component.html',
  styleUrl: './field-group.component.css',
})
export class FieldGroupComponent {

  integerValue: string = '';
  isValid: boolean = true;
  selectedDateTime: string = '';
  selectedOption: string = '';
  selectedOptions: string[] = [];
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  uploadedFileName: string | null = null;


  fieldGroups: FieldGroup[] = [
    {
      id: 1,
      name: 'AMC Reports',
      description: 'Reports for AMC Services',
      elements: [
        { email: '', description: 'Contact for AMC reports' },
      ],
    },
    {
      id: 2,
      name: 'HVAC Repair',
      description: 'Service for HVAC systems',
      elements: [
        { email: '', description: 'Contact for HVAC services' },
      ],
    },
    {
      id: 3,
      name: 'AMC Yearly',
      description: 'Annual maintenance contracts',
      elements: [
        { email: '', description: 'Contact for AMC yearly updates' },
      ],
    },
    {
      id: 4,
      name: 'AMC Installations - Tier 3',
      description: 'Tier 3 Installation Services',
      elements: [
        { email: '', description: 'Contact for Tier 3 Installations' },
      ],
    },
  ];

  selectedGroups: FieldGroup[] = [];

  generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }


  // ✅ Select a group and add to the middle panel
  selectGroup(group: FieldGroup) {
    const isAlreadySelected = this.selectedGroups.some((g) => g.id === group.id);
    if (!isAlreadySelected) {
      this.selectedGroups.push({
        ...group,
        elements: [...group.elements],
      });
      group.isSelected = true;
    }
  }

  // ✅ Create a new group dynamically
  createNewGroup() {
    const newGroup: FieldGroup = {
      id: this.fieldGroups.length + 1,
      name: `New Group ${this.fieldGroups.length + 1}`,
      description: `Description for Group ${this.fieldGroups.length + 1}`,
      elements: [],
    };
    this.fieldGroups.push(newGroup);
    this.selectGroup(newGroup);
  }


  editGroupProperty(group: FieldGroup, property: 'name' | 'description') {
    const newValue = prompt(
      `Edit ${property === 'name' ? 'Group Name' : 'Description'}`,
      group[property]
    );
    if (newValue !== null && newValue.trim() !== '') {
      group[property] = newValue.trim();
    }
  }

  deleteGroup(group: FieldGroup) {
    const index = this.selectedGroups.findIndex((g) => g.id === group.id);
    if (index !== -1) {
      this.selectedGroups.splice(index, 1);
    }
  }

  copyGroup(group: FieldGroup) {
    const copiedGroup: FieldGroup = {
      ...group,
      id: this.getNextGroupId(),
      name: `${group.name} (Copy)`,
      elements: [...group.elements.map((el) => ({
        ...el,
        id: this.generateId(),
      }))],
    };
    this.selectedGroups.push(copiedGroup);
  }

  getNextGroupId(): number {
    const maxId = Math.max(...this.selectedGroups.map((g) => g.id), 0);
    return maxId + 1;
  }

  removeElement(group: FieldGroup, index: number) {
    group.elements.splice(index, 1);
  }

  get connectedDropLists(): string[] {
    return this.selectedGroups.map((group) => `group-${group.id}`);
  }

  validateInteger(event: any) {
    const value = event.target.value;
    const regex = /^[0-9\s]*$/;

    if (regex.test(value)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadedFileName = file.name;
      console.log('File selected:', file.name);
    }
  }

  editElement(group: FieldGroup, index: number) {
    group.elements[index].isEditing = true;
  }


  copyElement(group: FieldGroup, index: number) {
    const elementCopy = { ...group.elements[index], isEditing: false };
    group.elements.splice(index + 1, 0, elementCopy);
  }

  validateEmail(element: Element, index: number) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    element.isValidEmail = emailPattern.test(element.email);
  }
  
  // Save updated element
  saveElement(group: FieldGroup, index: number) {
    if (group.elements[index].isValidEmail) {
      group.elements[index].isEditing = false;
    } else {
      alert('Invalid email address. Please correct it before saving.');
    }
  }






}
