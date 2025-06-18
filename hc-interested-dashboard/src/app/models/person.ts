export interface Person {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  formattedPhoneNumber: string;
  courseOrdered: string;
  orderDate: string;
  status?: string;
  responsible?: string;
  selected?: boolean;
}