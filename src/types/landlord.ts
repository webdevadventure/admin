
export type LandlordStatus = "pending" | "active" | "inactive";

export interface Landlord {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  joinedDate: string;
  totalRooms: number;
  status: LandlordStatus;
}
