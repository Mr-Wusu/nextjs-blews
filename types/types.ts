export interface SuggestionType {
  id: number;
  requestedBy: string;
  description: string;
  image: string;
  email: string;
  requestedOn: string;
  status: "pending" | "accepted" | "rejected";
}
