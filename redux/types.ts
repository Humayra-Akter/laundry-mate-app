// redux/types.ts
export interface SelectedServices {
  Iron: number;
  WashIron: number;
  DryClean: number;
}

export interface CartItem {
  // index(index: any): void;
  ItemName: string;
  selectedServices: SelectedServices;
  totalPrice: number;
}
