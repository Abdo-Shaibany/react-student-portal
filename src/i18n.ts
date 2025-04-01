import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Student Portal",
      student: "Student",
      student_description: "Submit your requests and track their progress",
      continue_as_student: "Continue as Student",
      employee: "Employee",
      employee_description: "Access the management dashboard",
      employee_login: "Employee Login",
      "Student Request Form": "Student Request Form",
      "Full Name": "Full Name",
      "John Doe": "John Doe",
      "Phone": "Phone",
      "712345678": "712345678",
      "Title": "Title",
      "Request Title": "Request Title",
      "Department": "Department",
      "Select department": "Select department",
      "Message": "Message",
      "Type your message here": "Type your message here",
      "Upload Files (PDFs & Images)": "Upload Files (PDFs & Images)",
      "Submitting...": "Submitting...",
      "Submit Request": "Submit Request",
      "Request Submitted": "Request Submitted",
      "Your request was submitted successfully! Your request number is:": "Your request was submitted successfully! Your request number is:",
      "Close": "Close",
      "Department is required": "Department is required",
      "Full Name is required": "Full Name is required",
      "Title is required": "Title is required",
      "Message is required": "Message is required"
    }
  },
  ar: {
    translation: {
      welcome: "مرحباً بك في بوابة الطالب",
      student: "طالب",
      student_description: "أرسل طلباتك وتابع تقدمها",
      continue_as_student: "المتابعة كطالب",
      employee: "موظف",
      employee_description: "الوصول إلى لوحة الإدارة",
      employee_login: "تسجيل دخول الموظف",
      "Student Request Form": "استمارة طلب الطالب",
      "Full Name": "الاسم الكامل",
      "John Doe": "جون دو",
      "Phone": "الهاتف",
      "712345678": "712345678",
      "Title": "العنوان",
      "Request Title": "عنوان الطلب",
      "Department": "القسم",
      "Select department": "اختر القسم",
      "Message": "الرسالة",
      "Type your message here": "اكتب رسالتك هنا",
      "Upload Files (PDFs & Images)": "رفع الملفات (PDF والصور)",
      "Submitting...": "جاري الإرسال...",
      "Submit Request": "إرسال الطلب",
      "Request Submitted": "تم تقديم الطلب",
      "Your request was submitted successfully! Your request number is:": "تم تقديم طلبك بنجاح! رقم طلبك هو:",
      "Close": "إغلاق",
      "Department is required": "القسم مطلوب",
      "Full Name is required": "الاسم الكامل مطلوب",
      "Title is required": "العنوان مطلوب",
      "Message is required": "الرسالة مطلوبة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
