declare module "rrad" {
  interface Address {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
  }
  export const addresses: Address[];
}
