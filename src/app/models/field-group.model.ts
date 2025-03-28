

export interface Element {
  email: string;
  description: string;
  isEditing?: boolean;
  isValidEmail?: boolean;
}

export interface FieldGroup {
  id: number;
  name: string;
  description: string;
  elements: Element[];
  isSelected?: boolean;
}
