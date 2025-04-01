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
      "Message is required": "Message is required",
      "employeeLogin": "Employee Login",
      "phone": "Phone",
      "password": "Password",
      "passwordPlaceholder": "Enter your password",
      "submitting": "Submitting...",
      "login": "Login",
      "passwordRequired": "Password is required",
      "departmentRequestsOverview": "Department Requests Overview",
      "completed": "Completed",
      "pending": "Pending",
      "late": "Late",
      "lateRequests": "Late Requests",
      "filterByDepartment": "Filter by department",
      "allDepartments": "All Departments",
      "requestId": "Request ID",
      "title": "Title",
      "department": "Department",
      "created": "Created",
      "daysLate": "Days Late",
      "actions": "Actions",
      "viewDetails": "View Details",
      "noLateRequestsFound": "No late requests found",
      "systemBrand": {
        "title": "Student Request Managment"
      },
      "navMain": {
        "dashboard": "Dashboard",
        "departments": "Departments",
        "userManagement": "User Management",
        "studentRequests": "Student Requests"
      },
      'Search departments...': 'Search departments...',
      'Create Department': 'Create Department',
      'Edit Department': 'Edit Department',
      'Create New Department': 'Create New Department',
      'Modify department details': 'Modify department details',
      'Add a new department to the system': 'Add a new department to the system',
      'Department updated!': 'Department updated!',
      'Department created!': 'Department created!',
      'Department Name': 'Department Name',
      'Total Requests': 'Total Requests',
      'Actions': 'Actions',
      'Edit': 'Edit',
      'Delete': 'Delete',
      'Previous': 'Previous',
      'Next': 'Next',
      'Page {{page}}': 'Page {{page}}',
      'No departments found': 'No departments found',
      "form": {
        "departmentName": "Department Name",
        "saveChanges": "Save Changes",
        "createDepartment": "Create Department",
        "fullName": "Full Name",
        "phone": "Phone",
        "password": "Password",
        "department": "Department",
        "selectDepartment": "Select department",
        "createUser": "Create User",
        "editUser": "Edit User",
        "createNewUser": "Create New User",
        "searchUsers": "Search users...",
        "name": "Name",
        "requestsHandled": "Requests Handled",
        "actions": "Actions",
        "edit": "Edit",
        "delete": "Delete",
        "noUsersFound": "No users found",
        "unassigned": "Unassigned"
      },
      "validation": {
        "nameMin": "Name must be at least 3 characters",
        "nameRequired": "Name is required",
        "passwordRequired": "Password is required",
        "departmentRequired": "Department is required",
        "yemenPhone": "Invalid phone number. Must start with 7 followed by 7, 3, 8, or 0 and then 7 digits.",
      },
      "loading": "Loading...",
      "error": {
        "fetchUsers": "Failed to fetch users",
        "submitUser": "Failed to submit user",
        "deleteUser": "Failed to delete user"
      },
      "success": {
        "userUpdated": "User updated successfully",
        "userCreated": "User created successfully",
        "userDeleted": "User deleted successfully"
      },
      "chart": {
        "requestsPerDay": "Requests Per Day"
      },
      "filter": {
        "status": "Filter by status",
        "department": "Filter by department",
        "employee": "Filter by employee"
      },
      "status": {
        "all": "All Statuses",
        "pending": "Pending",
        "inProgress": "In Progress",
        "completed": "Completed",
      },
      "sort": {
        "date": "Sort by date",
        "newestFirst": "Newest First",
        "oldestFirst": "Oldest First"
      },
      "search": {
        "requests": "Search requests..."
      },
      "table": {
        "requestNumber": "Request #",
        "studentName": "Student Name",
        "title": "Title",
        "phone": "Phone",
        "createdAt": "Created At",
        "status": "Status",
        "department": "Department",
        "assignedTo": "Assigned To",
        "actions": "Actions"
      },
      "action": {
        "viewDetails": "View Details"
      },
      "department.all": "All Departments",
      "employee.all": "All Employees",
      "button": {
        "changeStatus": "Change Status",
        "updateStatus": "Update Status"
      },
      "dialog": {
        "updateRequestStatus": "Update Request Status",
        "addStatusDescription": "Add a new status to the request"
      },
      "select": {
        "newStatus": "Select new status"
      },
      "placeholder": {
        "addComment": "Add comment..."
      },

      "accordion": {
        "studentInformation": "Student Information",
        "requestTitle": "Request Title",
        "message": "Message",
        "attachedFiles": "Attached Files ({{count}})",
        "statusHistory": "Status History"
      },
      "label": {
        "name": "Name",
        "phone": "Phone"
      }
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
      "Message is required": "الرسالة مطلوبة",
      "employeeLogin": "تسجيل دخول الموظف",
      "phone": "الهاتف",
      "password": "كلمة المرور",
      "passwordPlaceholder": "أدخل كلمة المرور الخاصة بك",
      "submitting": "جاري الإرسال...",
      "login": "تسجيل الدخول",
      "passwordRequired": "كلمة المرور مطلوبة",
      "departmentRequestsOverview": "نظرة عامة على طلبات الأقسام",
      "completed": "مكتمل",
      "pending": "معلق",
      "late": "متأخر",
      "lateRequests": "الطلبات المتأخرة",
      "filterByDepartment": "تصفية حسب القسم",
      "allDepartments": "جميع الأقسام",
      "requestId": "رقم الطلب",
      "title": "العنوان",
      "department": "القسم",
      "created": "تاريخ الإنشاء",
      "daysLate": "أيام التأخير",
      "actions": "الإجراءات",
      "viewDetails": "عرض التفاصيل",
      "noLateRequestsFound": "لم يتم العثور على طلبات متأخرة",
      "systemBrand": {
        "title": "نظام إدارة الطلبات الطلابية"
      },
      "navMain": {
        "dashboard": "لوحة القيادة",
        "departments": "الأقسام",
        "userManagement": "إدارة المستخدمين",
        "studentRequests": "طلبات الطلاب"
      },
      'Search departments...': 'ابحث عن الأقسام...',
      'Create Department': 'أنشئ قسم',
      'Edit Department': 'عدل القسم',
      'Create New Department': 'أنشئ قسم جديد',
      'Modify department details': 'قم بتغيير تفاصيل القسم',
      'Add a new department to the system': 'أضف قسم جديد إلى النظام',
      'Department updated!': 'تم تحديث القسم!',
      'Department created!': 'تم إنشاء القسم!',
      'Department Name': 'اسم القسم',
      'Total Requests': 'إجمالي الطلبات',
      'Actions': 'الإجراءات',
      'Edit': 'تعديل',
      'Delete': 'حذف',
      'Previous': 'السابق',
      'Next': 'التالي',
      'Page {{page}}': 'الصفحة {{page}}',
      'No departments found': 'لم يتم العثور على أقسام',
      "form": {
        "departmentName": "اسم القسم",
        "saveChanges": "حفظ التغييرات",
        "createDepartment": "إنشاء قسم",
        "fullName": "الاسم الكامل",
        "phone": "الهاتف",
        "password": "كلمة المرور",
        "department": "القسم",
        "selectDepartment": "اختر القسم",
        "createUser": "إنشاء مستخدم",
        "editUser": "تعديل المستخدم",
        "createNewUser": "إنشاء مستخدم جديد",
        "searchUsers": "ابحث عن المستخدمين...",
        "name": "الاسم",
        "requestsHandled": "الطلبات المعالجة",
        "actions": "الإجراءات",
        "edit": "تعديل",
        "delete": "حذف",
        "noUsersFound": "لم يتم العثور على مستخدمين",
        "unassigned": "غير معين"
      },
      "validation": {
        "nameMin": "يجب أن يكون الاسم 3 أحرف على الأقل",
        "nameRequired": "الاسم مطلوب",
        "passwordRequired": "كلمة المرور مطلوبة",
        "departmentRequired": "القسم مطلوب",
        "yemenPhone": "رقم الهاتف غير صحيح. يجب أن يبدأ بالرقم 7 متبوعًا بالرقم 7 أو 3 أو 8 أو 0 ثم 7 أرقام.",
      },
      "loading": "جار التحميل...",
      "error": {
        "fetchUsers": "فشل في جلب المستخدمين",
        "submitUser": "فشل في إرسال بيانات المستخدم",
        "deleteUser": "فشل في حذف المستخدم"
      },
      "success": {
        "userUpdated": "تم تعديل المستخدم بنجاح",
        "userCreated": "تم إنشاء المستخدم بنجاح",
        "userDeleted": "تم حذف المستخدم بنجاح"
      },
      "chart": {
        "requestsPerDay": "الطلبات يوميًا"
      },
      "filter": {
        "status": "تصفية حسب الحالة",
        "department": "تصفية حسب القسم",
        "employee": "تصفية حسب الموظف"
      },
      "status": {
        "all": "جميع الحالات",
        "pending": "معلق",
        "inProgress": "قيد التنفيذ",
        "completed": "مكتمل"
      },
      "sort": {
        "date": "ترتيب حسب التاريخ",
        "newestFirst": "الأحدث أولاً",
        "oldestFirst": "الأقدم أولاً"
      },
      "search": {
        "requests": "ابحث عن الطلبات..."
      },
      "table": {
        "requestNumber": "رقم الطلب",
        "studentName": "اسم الطالب",
        "title": "العنوان",
        "phone": "الهاتف",
        "createdAt": "تاريخ الإنشاء",
        "status": "الحالة",
        "department": "القسم",
        "assignedTo": "المسؤول",
        "actions": "الإجراءات"
      },
      "action": {
        "viewDetails": "عرض التفاصيل"
      },
      "department.all": "جميع الاقسام",
      "employee.all": "جميع الموظفين",
      "button": {
        "changeStatus": "تغيير الحالة",
        "updateStatus": "تحديث الحالة"
      },
      "dialog": {
        "updateRequestStatus": "تحديث حالة الطلب",
        "addStatusDescription": "أضف حالة جديدة للطلب"
      },
      "select": {
        "newStatus": "اختر الحالة الجديدة"
      },
      "placeholder": {
        "addComment": "أضف تعليق..."
      },
      "accordion": {
        "studentInformation": "معلومات الطالب",
        "requestTitle": "عنوان الطلب",
        "message": "الرسالة",
        "attachedFiles": "الملفات المرفقة ({{count}})",
        "statusHistory": "تاريخ الحالة"
      },
      "label": {
        "name": "الاسم",
        "phone": "الهاتف"
      }
    },
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
  });

const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
i18n.changeLanguage(currentLanguage);
document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

export default i18n;
