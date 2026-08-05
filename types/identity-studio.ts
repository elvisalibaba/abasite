export type CompanyProfile = {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  specialties: string[];
  address: string;
  cityCountry: string;
  phone: string;
  email: string;
  website: string;
  qrCodeUrl: string;
  cardReference: string;
  validityLabel: string;
  logoPath: string;
};

export type PersonProfile = {
  firstName: string;
  middleName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  employeeId: string;
  phone: string;
  email: string;
  photoDataUrl: string;
  publicProfileUrl?: string;
};
