// clientApi.js
"use client";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

export const Api = axios.create({
  baseURL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// Institution Profile API
export const getInstitutionProfileApi = () =>
  Api.get("/api/institutionprofile/get");

// Banners API
export const getBannerApi = async () => Api.get("/api/banner");

// Why Choose Us API
export const getWhyChooseUsApi = () => Api.get("/api/whychooseus");

// Program
export const getProgramsApi = () => Api.get("/api/programs");

// Operating Model APIs
export const getOperatingModelApi = () => Api.get("/api/operatingModel");

// Impacts APIs
export const getImpactsApi = () => Api.get("/api/impacts");

// Gallery Content API
export const getAllGalleryContentsApi = () => Api.get("/api/gallery/get");

// News APIs
export const getAllNewsApi = () => Api.get("/api/news/all");
export const getSingleNewsApi = (id) => Api.get(`/api/news/get/${id}`);
export const getNewsBySlugApi = (slug) => Api.get(`/api/news/slug/${slug}`);
export const getRecentNewsApi = () => Api.get("api/news/recent?limit=3");

// Category API
export const getCategoriesApi = (tab, includeDeleted = false) =>
  Api.get(`/api/category/${tab}/get`, {
    params: { includeDeleted },
  });

// Group API
export const getAllGroupsApi = () => Api.get("/api/group");

// RoadMap API
export const getAllRoadMapsApi = () => Api.get("/api/roadMap/get");

// Objectives API
export const getAllObjectivesApi = () => Api.get("/api/objective/get");

// Motto API
export const getMottoContentApi = () => Api.get("/api/motto/get");

// Message API
export const getMessageApi = () => Api.get("/api/message/get");

//About Us API
export const getAboutUsApi = () => Api.get("/api/aboutus/get");

// Contact Us API
export const sendContactFormApi = (data) => Api.post("/api/contact/send", data);

// Courses APIs
export const getCourseBySlugApi = (slug) => Api.get(`/api/course/slug/${slug}`);
export const getCoursesApi = () => Api.get("/api/course");

// Team Member APIs
export const getAllTeamMembersApi = () => Api.get("/api/team");

// Signature LAb
export const getSignatureLabsApi = () => Api.get("/api/signaturelabs");

// Admissions & Assessment
export const getAdmissionsApi = () => Api.get("/api/admissions");
export const manageAdmissionsApi = (data) => Api.post("/api/admissions", data);

//FAQ
export const getFaqsApi = () => Api.get("/api/faqs");

//IndustryPartner
export const getIndustryPartnersPublicApi = () =>
  Api.get("/api/industry-partners");

//Application
export const submitApplicationApi = (data) =>
  Api.post("api/applications", data);

// VACANCIES
export const getVacanciesApi = () => Api.get("/api/vacancy");
export const getVacancyBySlugApi = (slug) =>
  Api.get(`/api/vacancy/slug/${slug}`);

// JOB APPLICATIONS
export const applyJobApi = (vacancyId, data) =>
  Api.post(`/api/jobApplications/vacancies/${vacancyId}/apply`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
