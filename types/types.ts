export interface SuggestionType {
  id: number;
  requestedBy: string;
  description: string;
  image: string;
  email: string;
  requestedOn: string;
  status: "pending" | "accepted" | "rejected";
  requesterPhoto: string;
}

export interface EnrichedSpecialRequest {
  _id: string;
  image: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  requestedBy: {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}

export interface CartType {
  _id: string;
  imageUrl: string;
  name: string;
  unit: number;
  unitPrice: number;
}