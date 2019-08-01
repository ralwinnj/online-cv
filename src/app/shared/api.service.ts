import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mdl from '../models/app-models';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders()
  .set("X-Requested-With", "XMLHttpRequest")
  .set("Accept", "application/json")
  .set("Content-Type", "application/json");

const reqOptions = { headers };
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = 'https://localhost:44351/api/';
  }

  postApplicantDocument(id:number, data: mdl.IApplicantDocument) {
    return this.http.post(`${this.API_URL}applicantdocuments/${id}`, data, reqOptions);
  }
  getApplicantDocumnent(id:number) {
    return this.http.get(`${this.API_URL}applicantdocuments/${id}`, reqOptions);
  }
  putApplicantDocumnent(id:number, data: mdl.IApplicantDocument) {
    return this.http.put(`${this.API_URL}applicantdocuments/${id}`, data, reqOptions);
  }
  deleteApplicantDocumnent(id:number) {
    return this.http.delete(`${this.API_URL}applicantdocuments/${id}`, reqOptions);
  }


  postApplicant(id:number, data: mdl.IApplicant) {
    return this.http.post(`${this.API_URL}applicants/${id}`, data, reqOptions);
  }
  getApplicants(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}applicants/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}applicants`, reqOptions);
    }
  }
  putApplicant(id:number, data: mdl.IApplicant) {
    return this.http.put(`${this.API_URL}applicants/${id}`, data, reqOptions);
  }
  deleteApplicant(id:number) {
    return this.http.delete(`${this.API_URL}applicants/${id}`, reqOptions);
  }


  postApplicantVacancies(id:number, data: mdl.IApplicantVacancy) {
    return this.http.post(`${this.API_URL}applicantvacancies`, data, reqOptions);
  }
  getApplicantVacancies(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}applicantvacancies/${id}`);
    } else {
      return this.http.post(`${this.API_URL}applicantvacancies`, reqOptions);
    }
  }

  postComputerLiteracies(id:number, data: mdl.IComputerLiteracy) {
    return this.http.post(`${this.API_URL}computerliteracies/${id}`, data, reqOptions);
  }
  getComputerLiteracies(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}computerliteracies/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}computerliteracies`, reqOptions);
    }
  }
  putComputerLiteracies(id:number, data: mdl.IComputerLiteracy) {
    return this.http.put(`${this.API_URL}computerliteracies`, data,reqOptions );
  }

  /* Criminal Record API */
  getCriminalRecords(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}criminalrecords/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}criminalrecords`, reqOptions);
    }
  }
  postCriminalRecords(id:number, data: mdl.ICriminalRecord) {
    return this.http.post(`${this.API_URL}criminalrecords/${id}`, data, reqOptions);
  }
  putCriminalRecords(id:number, data: mdl.ICriminalRecord){
    return this.http.post(`${this.API_URL}criminalrecords/${id}`, data, reqOptions);
  }
  deleteCriminalRecords(id:number){
    return this.http.delete(`${this.API_URL}criminalrecords/${id}`, reqOptions);
  }

  /* Disciplinary Record API */
  getDisciplinaryRecords(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}disciplinaryrecords/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}disciplinaryrecords`);
    }
  }
  postDisciplinaryRecords(id:number, data: mdl.IDisciplinaryRecord) {
    return this.http.post(`${this.API_URL}disciplinaryrecords/${id}`, data, reqOptions);
  }
  putDisciplinaryRecords(id:number, data: mdl.IDisciplinaryRecord){
    return this.http.post(`${this.API_URL}disciplinaryrecords/${id}`, data, reqOptions);
  }
  deleteDisciplinaryRecords(id:number){
    return this.http.delete(`${this.API_URL}disciplinaryrecords/${id}`, reqOptions);
  }

  /* Experiences API */
  getExperiences(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}experiences/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}experiences`);
    }
  }
  postExperiences(id:number, data: mdl.IExperience) {
    return this.http.post(`${this.API_URL}experiences/${id}`, data, reqOptions);
  }
  putExperiences(id:number, data: mdl.IExperience){
    return this.http.post(`${this.API_URL}experiences/${id}`, data, reqOptions);
  }
  deleteExperiences(id:number){
    return this.http.delete(`${this.API_URL}experiences/${id}`, reqOptions);
  }

  /* Generals API */
  getGenerals(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}generals/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}generals`);
    }
  }
  postGenerals(id:number, data: mdl.IGeneral) {
    return this.http.post(`${this.API_URL}generals/${id}`, data, reqOptions);
  }
  putGenerals(id:number, data: mdl.IGeneral){
    return this.http.post(`${this.API_URL}generals/${id}`, data, reqOptions);
  }
  deleteGenerals(id:number){
    return this.http.delete(`${this.API_URL}generals/${id}`, reqOptions);
  }



  /* ProfessionalMemberships API */
  getProfessionalMemberships(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}professionalmemberships/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}professionalmemberships`);
    }
  }
  postProfessionalMemberships(id:number, data: mdl.IProfessionalMembership) {
    return this.http.post(`${this.API_URL}professionalmemberships/${id}`, data, reqOptions);
  }
  putProfessionalMemberships(id:number, data: mdl.IProfessionalMembership){
    return this.http.post(`${this.API_URL}professionalmemberships/${id}`, data, reqOptions);
  }
  deleteProfessionalMemberships(id:number){
    return this.http.delete(`${this.API_URL}professionalmemberships/${id}`, reqOptions);
  }

  /* Qualifications API */
  getQualifications(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}qualifications/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}qualifications`);
    }
  }
  postQualifications(id:number, data: mdl.IQualification) {
    return this.http.post(`${this.API_URL}qualifications/${id}`, data, reqOptions);
  }
  putQualifications(id:number, data: mdl.IQualification){
    return this.http.post(`${this.API_URL}qualifications/${id}`, data, reqOptions);
  }
  deleteQualifications(id:number){
    return this.http.delete(`${this.API_URL}qualifications/${id}`, reqOptions);
  }

  /* Reference API */
  getReference(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}references/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}references`);
    }
  }
  postReference(id:number, data: mdl.IReference) {
    return this.http.post(`${this.API_URL}references/${id}`, data, reqOptions);
  }
  putReference(id:number, data: mdl.IReference){
    return this.http.post(`${this.API_URL}references/${id}`, data, reqOptions);
  }
  deleteReference(id:number){
    return this.http.delete(`${this.API_URL}references/${id}`, reqOptions);
  }

  /* Vacancies API */
  getVacancies(id?:number) {
    if (id) {
      return this.http.get(`${this.API_URL}vacancies/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}vacancies`);
    }
  }
  postVacancies(data: mdl.IReference) {
    return this.http.post(`${this.API_URL}vacancies`, data, reqOptions);
  }
  deleteVacancies(id:number){
    return this.http.delete(`${this.API_URL}vacancies/${id}`, reqOptions);
  }



  /* Users */
  createUser(data: mdl.IRegister) {
    return this.http.post(`${this.API_URL}users`, data, reqOptions);
  }
  deleteUser(id:number) {
    return this.http.delete(`${this.API_URL}users`, reqOptions);
  }

  /* Login API */
  validateLogin(data: mdl.ILogin) {
    return this.http.post(`${this.API_URL}logins`, data, reqOptions);
  }
  updatePassword1(id:number, data: mdl.IUpdatePassword){
    // TODO ADD CODE HERE  SOON!
  }


  // createLogin(data?) {
  //   return this.http.post(`${this.API_URL}users`, data, reqOptions);
  // }

  // ValidateLogin(data) {
  //   return this.http.post(`${this.API_URL}login`, data, reqOptions);
  // }

  // GetApplicant(data) {
  //   return this.http.post(`${this.API_URL}getapplicant`, data, reqOptions);
  // }

  // updateApplicant(data, id) {
  //   return this.http.put(`${this.API_URL}applicants/${id}`, data, reqOptions );
  // }
  // editApplicant(data) {
  //   return this.http.post(`${this.API_URL}editapplicant`, data, reqOptions);
  // }

  // updatePassword(data) {
  //   return this.http.post(`${this.API_URL}updatepassword`, data, reqOptions);
  // }

  // vacancyAdd(data) {
  //   return this.http.post(`${this.API_URL}vacancyadd`, data, reqOptions);
  // }

  // EducationAdd(data) {
  //   return this.http.post(`${this.API_URL}educationadd`, data, reqOptions);
  // }

  // ExperienceAdd(data) {
  //   return this.http.post(`${this.API_URL}experienceadd`, data, reqOptions);
  // }

}
