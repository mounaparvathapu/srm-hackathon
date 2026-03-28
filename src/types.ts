export type UserRole = 'borrower' | 'lender' | 'both' | 'admin';
export type KYCStatus = 'pending' | 'verified' | 'rejected';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: string;
  city?: string;
  state?: string;
  pincode?: string;
  role: UserRole;
  kycStatus: KYCStatus;
  aadhaarNumber?: string;
  panNumber?: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
  employment?: {
    type: string;
    income: number;
    employer: string;
  };
  creditScore?: number;
  isPremium?: boolean;
  profilePhoto?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
  panCard?: string;
}

export interface LoanApplication {
  id: string;
  borrowerId: string;
  amount: number;
  purpose: string;
  duration: number;
  preferredRate: number;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  createdAt: string;
}

export interface Loan {
  id: string;
  borrowerId: string;
  lenderId: string;
  amount: number;
  interestRate: number;
  duration: number;
  startDate: string;
  status: 'active' | 'completed' | 'overdue';
  repaymentProgress: number;
  nextDueDate: string;
}
