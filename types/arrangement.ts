export interface ArrangementType {
  _id?: string;           // _id is optional here because Mongoose adds it automatically
  title: string;
  description?: string;   // optional, since in schema it's not required
  price: number;
  pdfUrl: string;
  coverImageUrl?: string; // optional
  isFeatured?: boolean;   // optional, default is false in schema
  createdAt?: string;     // from timestamps
  updatedAt?: string;     // from timestamps
}
