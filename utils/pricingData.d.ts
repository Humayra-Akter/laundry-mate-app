declare module "../../utils/pricingData.json" {
  interface Item {
    ItemName: string;
    IronPrice: number | null;
    WashIronPrice: number | null;
    DryCleanPrice: number | null;
  }

  const value: Item[];
  export default value;
}
