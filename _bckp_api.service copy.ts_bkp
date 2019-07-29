import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = 'https://localhost:44351/api/';
  }

  createLogin(data) {

    /**
     * object {
     *    string id_number, 
     *    string email, 
     *    string password
     * }
     */
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    console.log(data);
    // return this.http.post(`${this.API_URL}Users`, data, { headers });
    return this.http.get(`${this.API_URL}Users`);
  }

  ValidateLogin(data) {
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    return this.http.post(`${this.API_URL}ValidateLogin`, data, { headers });
  }

  /** TODO: Write this API ASAP */
  GetApplicant(body) {
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    return this.http.post(`${this.API_URL}GetApplicant`, body, { headers });
  }

  editApplicant(data) {
    /**
     * object {
     *    string first_name, 
     *    string known_as_name, 
     *    string last_name, 
     *    Nullable<bool> southAfrican_YN, 
     *    string id_number, 
     *    string nationality, 
     *    string passportORLocalID, 
     *    string workPermitNo, 
     *    string telNo, 
     *    string cellNo, 
     *    string suburb, 
     *    string residentialTownORCity, 
     *    Nullable<int> residentialProvince, 
     *    Nullable<int> residentialCountry, 
     *    Nullable<int> gender, 
     *    Nullable<int> race, 
     *    Nullable<int> disability, 
     *    Nullable<int> disability_nature, 
     *    string diability_other, 
     *    Nullable<int> highestQualification, 
     *    string keyExpertise, 
     *    string expertiseOther, 
     *    string yearsOfExperience, 
     *    string costToCompany, 
     *    string natureOfEmploymentReq, 
     *    string relationshipWithUs, 
     *    Nullable<bool> criminalRecord, 
     *    Nullable<bool> driversLicense, 
     *    string driversLicenseType, 
     *    string languageProfeciency, 
     *    string heardAboutUs, 
     *    Nullable<bool> marketingInfo
     * }
     */
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    console.log('editApplicant : ', data);
    return this.http.post(`${this.API_URL}EditApplicant`, data, { headers });
  }

  updatePassword(data) {
    /**
     * object {
     *    string id_number, 
     *    string email, 
     *    string password,
     * }
     */
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    console.log('updatePassword : ', data);
    return this.http.post(`${this.API_URL}UpdatePassword`, data, { headers });
  }

  vacancyAdd(data) {
    /**
     * object {
     *    Nullable<int> id, 
     *    string title, 
     *    string directorate, 
     *    string grade, 
     *    string package, 
     *    string reference, 
     *    string requirements, 
     *    string kpas, 
     *    string day, 
     *    string closing_date, 
     *    string download, 
     *    string contact, 
     *    string author, 
     *    Nullable<bool> active, 
     *    Nullable<int> count, 
     *    Nullable<int> month, 
     *    Nullable<int> year, 
     *    Nullable<System.DateTime> creationdate
     * }
     */
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    return this.http.post(`${this.API_URL}VacancyAdd`, data, { headers });

  }
  EducationAdd(data) {
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    return this.http.post(`${this.API_URL}EducationAdd`, data, { headers });
  }

  ExperienceAdd(data) {
    const headers = new HttpHeaders()
      .set("X-Requested-With", "XMLHttpRequest")
      .set("Content-Type", "application/json");
    return this.http.post(`${this.API_URL}ExperienceAdd`, data, { headers });
  }
}
