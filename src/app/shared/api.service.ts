import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  postApplicantDocument(data) {
    return this.http.post(`${this.API_URL}applicantdocuments` ,data, reqOptions);
  }
  getApplicantDocumnent(id){
    return this.http.get(`${this.API_URL}applicantdocuments/${id}`, reqOptions);
  }
  putApplicantDocumnent(id, data){
    return this.http.put(`${this.API_URL}applicantdocuments/${id}`, data, reqOptions);
  }
  deleteApplicantDocumnent(id){
    return this.http.delete(`${this.API_URL}applicantdocuments/${id}`, reqOptions);
  }

  postApplicant(data) {
    return this.http.post(`${this.API_URL}applicants` ,data, reqOptions);
  }
  getApplicants(){
    return this.http.get(`${this.API_URL}applicants`, reqOptions);
  }
  getApplicant(id){
    return this.http.get(`${this.API_URL}applicants/${id}`, reqOptions);
  }
  putApplicant(id, data){
    return this.http.put(`${this.API_URL}applicants/${id}`, data, reqOptions);
  }
  deleteApplicant(id){
    return this.http.delete(`${this.API_URL}applicants/${id}`, reqOptions);
  }
  

  postApplicantVacancy(data) {
    return this.http.post(`${this.API_URL}applicantvacancies`, data, reqOptions);
  }
  getApplicantVacancies() {
    return this.http.post(`${this.API_URL}applicantvacancies`, reqOptions);
  }
  getVacancies() {
    return this.http.get(`${this.API_URL}applicantvacancies`, reqOptions);
  }
  getVacancy(id) {
    return this.http.get(`${this.API_URL}applicantvacancies/${id}`, reqOptions);
  }
  

  createLogin(data?) {
    return this.http.post(`${this.API_URL}users`, data, reqOptions);
  }

  ValidateLogin(data) {
    return this.http.post(`${this.API_URL}validatelogin`, data, reqOptions);
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
