// redux/types.ts
export interface SelectedServices {
  Iron: number;
  WashIron: number;
  DryClean: number;
}

export interface CartItem {
  ItemName: string;
  selectedServices: SelectedServices;
  totalPrice: number;
}
