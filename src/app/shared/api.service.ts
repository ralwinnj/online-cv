import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  postApplicantDocument(id, data) {
    return this.http.post(`${this.API_URL}applicantdocuments/${id}`, data, reqOptions);
  }
  getApplicantDocumnent(id) {
    return this.http.get(`${this.API_URL}applicantdocuments/${id}`, reqOptions);
  }
  putApplicantDocumnent(id, data) {
    return this.http.put(`${this.API_URL}applicantdocuments/${id}`, data, reqOptions);
  }
  deleteApplicantDocumnent(id) {
    return this.http.delete(`${this.API_URL}applicantdocuments/${id}`, reqOptions);
  }


  postApplicant(id, data) {
    return this.http.post(`${this.API_URL}applicants/${id}`, data, reqOptions);
  }
  getApplicants(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}applicants/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}applicants`, reqOptions);
    }
  }
  putApplicant(id, data) {
    return this.http.put(`${this.API_URL}applicants/${id}`, data, reqOptions);
  }
  deleteApplicant(id) {
    return this.http.delete(`${this.API_URL}applicants/${id}`, reqOptions);
  }


  postApplicantVacancy(id, data) {
    return this.http.post(`${this.API_URL}applicantvacancies`, data, reqOptions);
  }
  getApplicantVacancies(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}applicantvacancies/${id}`);
    } else {
      return this.http.post(`${this.API_URL}applicantvacancies`, reqOptions);
    }
  }

  postComputerLiteracy(id, data) {
    return this.http.post(`${this.API_URL}computerliteracies/${id}`, data, reqOptions)
  }
  getComputerLiteracies(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}computerliteracies/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}computerliteracies`, reqOptions);
    }
  }
  putComputerLiteracies(id, data) {
    return this.http.put(`${this.API_URL}computerliteracies`, data,reqOptions );
  }

  /* Criminal Record API */
  getCriminalRecords(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}criminalrecords/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}criminalrecords`);
    }
  }
  postCriminalRecords(id, data) {
    return this.http.post(`${this.API_URL}/criminalrecords/${id}`, data, reqOptions);
  }
  putCriminalRecords(id, data){
    return this.http.post(`${this.API_URL}/criminalrecords/${id}`, data, reqOptions);
  }
  deleteCriminalRecords(id){
    return this.http.delete(`${this.API_URL}/criminalrecords/${id}`, reqOptions);
  }

  /* Disciplinary Record API */
  getDisciplinaryRecords(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}disciplinary/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}disciplinary`);
    }
  }
  postDisciplinaryRecords(id, data) {
    return this.http.post(`${this.API_URL}/disciplinary/${id}`, data, reqOptions);
  }
  putDisciplinaryRecords(id, data){
    return this.http.post(`${this.API_URL}/disciplinary/${id}`, data, reqOptions);
  }
  deleteDisciplinaryRecords(id){
    return this.http.delete(`${this.API_URL}/disciplinary/${id}`, reqOptions);
  }

  /* Experiences API */
  getExperiences(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}experiences/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}experiences`);
    }
  }
  postExperiences(id, data) {
    return this.http.post(`${this.API_URL}/experiences/${id}`, data, reqOptions);
  }
  putExperiences(id, data){
    return this.http.post(`${this.API_URL}/experiences/${id}`, data, reqOptions);
  }
  deleteExperiences(id){
    return this.http.delete(`${this.API_URL}/experiences/${id}`, reqOptions);
  }

  /* Generals API */
  getGenerals(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}generals/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}generals`);
    }
  }
  postGenerals(id, data) {
    return this.http.post(`${this.API_URL}/generals/${id}`, data, reqOptions);
  }
  putGenerals(id, data){
    return this.http.post(`${this.API_URL}/generals/${id}`, data, reqOptions);
  }
  deleteGenerals(id){
    return this.http.delete(`${this.API_URL}/generals/${id}`, reqOptions);
  }



  /* ProfessionalMemberships API */
  getProfessionalMemberships(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}professsionalmemberships/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}professsionalmemberships`);
    }
  }
  postProfessionalMemberships(id, data) {
    return this.http.post(`${this.API_URL}/professsionalmemberships/${id}`, data, reqOptions);
  }
  putProfessionalMemberships(id, data){
    return this.http.post(`${this.API_URL}/professsionalmemberships/${id}`, data, reqOptions);
  }
  deleteProfessionalMemberships(id){
    return this.http.delete(`${this.API_URL}/professsionalmemberships/${id}`, reqOptions);
  }

  /* Qualifications API */
  getQualifications(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}qualifications/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}qualifications`);
    }
  }
  postQualifications(id, data) {
    return this.http.post(`${this.API_URL}/qualifications/${id}`, data, reqOptions);
  }
  putQualifications(id, data){
    return this.http.post(`${this.API_URL}/qualifications/${id}`, data, reqOptions);
  }
  deleteQualifications(id){
    return this.http.delete(`${this.API_URL}/qualifications/${id}`, reqOptions);
  }

  /* Reference API */
  getReference(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}references/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}references`);
    }
  }
  postReference(id, data) {
    return this.http.post(`${this.API_URL}/references/${id}`, data, reqOptions);
  }
  putReference(id, data){
    return this.http.post(`${this.API_URL}/references/${id}`, data, reqOptions);
  }
  deleteReference(id){
    return this.http.delete(`${this.API_URL}/references/${id}`, reqOptions);
  }

  /* Vacancies API */
  getVacancies(id?) {
    if (id) {
      return this.http.get(`${this.API_URL}vacancies/${id}`, reqOptions);
    } else {
      return this.http.get(`${this.API_URL}vacancies`);
    }
  }
  postVacancies(data) {
    return this.http.post(`${this.API_URL}/vacancies`, data, reqOptions);
  }
  deleteVacancies(id){
    return this.http.delete(`${this.API_URL}/vacancies/${id}`, reqOptions);
  }



  /* Users */
  createUser(data) {
    return this.http.post(`${this.API_URL}users`, data, reqOptions);
  }
  deleteUser(id) {
    return this.http.delete(`${this.API_URL}users`, reqOptions);
  }

  /* Login API */
  ValidateLogin1(data) {
    return this.http.post(`${this.API_URL}logins`, data, reqOptions);
  }
  updatePassword1(id, data){
    console.log('TODO add this code soon!');
  }


  createLogin(data?) {
    return this.http.post(`${this.API_URL}users`, data, reqOptions);
  }

  ValidateLogin(data) {
    return this.http.post(`${this.API_URL}login`, data, reqOptions);
  }

  GetApplicant(body) {
    return this.http.post(`${this.API_URL}getapplicant`, body, reqOptions);
  }

  updateApplicant(data, id) {
    return this.http.put(`${this.API_URL}applicants/${id}`, data, reqOptions );
  }
  editApplicant(data) {
    return this.http.post(`${this.API_URL}editapplicant`, data, reqOptions);
  }

  updatePassword(data) {
    return this.http.post(`${this.API_URL}updatepassword`, data, reqOptions);
  }

  vacancyAdd(data) {
    return this.http.post(`${this.API_URL}vacancyadd`, data, reqOptions);
  }

  EducationAdd(data) {
    return this.http.post(`${this.API_URL}educationadd`, data, reqOptions);
  }

  ExperienceAdd(data) {
    return this.http.post(`${this.API_URL}experienceadd`, data, reqOptions);
  }

}
