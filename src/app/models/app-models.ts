export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdatePassword {
  email: string;
  idNumber: string;
  phoneNumber: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  citizenship: boolean;
  idNumber: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface IApplicant {
  id?: number;
  title: string;
  firstName: string;
  lastName: string;
  race: string;
  dependant?: boolean;
  dependantAge?: string;
  disability?: boolean;
  disabilityNature?: string;
  citizenship: string;
  idNumber: string;
  nationality: string;
  workPermitNumber?: string;
  sarsRegistered: boolean;
  sarsTaxNumber: string;
  driversLicence: boolean;
  driversLicenceType: string;
  address: string;
  language: string;
  phoneNumber: string;
  createdAt?: Date;

}

export interface IApplicantDocument {
  id?: number;
  document: any;
  documentName: string;
  documentPath: string;
  documentFormat: string;
  documentType: string;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IApplicantVacancy {
  id?: number;
  title: string;
  directorate: string;
  grade: string;
  package: string;
  references: string;
  kpas: string;
  closingDate: Date;
  download: string;
  contact: string;
  author: string;
  active: string;
  fkApplicantId?: number;
}

export interface IVacancy {
  id?: number;
  title: string;
  directorate: string;
  grade: string;
  package: string;
  references: string;
  requirements: string
  kpas: string;
  date?: number;
  closingDate: Date;
  download: string;
  contact: string;
  author: string;
  active: string;
}

export interface IComputerLiteracy {
  id?: number;
  skill: string;
  competency: string,
  createdAt?: Date,
  fkApplicantId?: number;
}

export interface ICriminalRecord {
  id?: number;
  record: boolean;
  typeOfCriminalAct: string;
  dateFinalized: Date;
  outcome: string;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IDisciplinaryRecord {
  id?: number;
  record: boolean;
  nameOfInstitute: string;
  typeOfMisconduct: string;
  dateFinalized: string;
  awardSanction: string;
  resign: boolean;
  resignReason: string;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IExperience {
  id?: number;
  employer: string;
  position: string;
  startDate: Date;
  endDate: Date;
  reasonForLeaving: string;
  description: string;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IGeneral {
  id?: string;
  physicalMentalCondition: boolean;
  conflictOfInterest: string;
  conflictOfInterestReason: string;
  commenceDate: Date;
  positionTermAccepted: boolean;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IProfessionalMembership {
  id?: number;
  professionalBody: string;
  membershipNumber: string;
  expiryDate: Date;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IQualification {
  id?: number;
  nameOfInstitute: string;
  nameOfQualification: string;
  typeOfQualification: string;
  yearObtained: number;
  createdAt?: Date;
  fkApplicantId?: number;
}

export interface IReference {
  id?: number;
  name: string;
  relationship: string;
  telNumber: string;
  cellNumber: string;
  email: string;
  createdAt?: Date;
  fkApplicantId?: number;
}
