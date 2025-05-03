import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      instructions: "Student instructions: Your request will be processed within 24 hours after submission. Please check with the college.",
      welcome: "Welcome to Student Portal",
      student: "Student",
      student_description: "Submit your requests and track their progress",
      continue_as_student: "Continue as Student",
      employee: "Employee",
      employee_description: "Access the management dashboard",
      employee_login: "Employee Login",
      "Student Request Form": "Student Request Form",
      "Full Name": "Full Name",
      "John Doe": "Enter your full name",
      "Phone": "Phone number",
      "712345678": "phone number",
      "Title": "Title",
      "Request Title": "Request Title",
      "Department": "Department",
      "Request Type": "Request type",
      "Select department": "Select department",
      "Select request type": "Select request type",
      "Message": "Message",
      "Type your message here": "Type your message here",
      "Upload Files (PDFs & Images)": "Upload Files (PDFs & Images)",
      "Submitting...": "Submitting...",
      "Submit Request": "Submit Request",
      "Request Submitted": "Request Submitted",
      "Your request was submitted successfully! Your request number is:": "Your request was submitted successfully! Your request number is:",
      "Close": "Close",
      "Department is required": "Department is required",
      "Request Type is required": "Request Type is required",
      "Full Name is required": "Full Name is required",
      "Title is required": "Title is required",
      "Message is required": "Message is required",
      "employeeLogin": "Employee Login",
      "studentLogin": "Student Login",
      "phone": "Phone number",
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
        "studentRequests": "Student Requests",
        "requestTypes": "Request Types",
        studentUserManagement: "Student Accounts Management"
      },
      'Search departments...': 'Search departments...',
      'Search requests types...': 'Search requests types...',
      'Create Department': 'Create Department',
      'Create Request Type': 'Create Request Type',
      'Edit Department': 'Edit Department',
      'Edit Request Type': 'Edit Request Type',
      'Create New Department': 'Create New Department',
      'Create New Request Type': 'Create New Request Type',
      'Modify department details': 'Modify department details',
      'Modify request type details': 'Modify request type details',
      'Add a new department to the system': 'Add a new department to the system',
      'Add a new request type to the system': 'Add a new request type to the system',
      'Department updated!': 'Department updated!',
      'Department created!': 'Department created!',
      'Request Type updated!': 'Request Type updated!',
      'Request Type created!': 'Request Type created!',
      'Department Name': 'Department Name',
      'Request Type Name': 'Request Type Name',
      'Total Requests': 'Total Requests',
      'Actions': 'Actions',
      'Edit': 'Edit',
      'Delete': 'Delete',
      'Previous': 'Previous',
      'Next': 'Next',
      'Page {{page}}': 'Page {{page}}',
      'No departments found': 'No departments found',
      'No request types found': 'No request types found',
      "form": {
        "departmentName": "Department Name",
        "requestTypeName": "Request Type Name",
        "saveChanges": "Save Changes",
        "createDepartment": "Create Department",
        "createRequestType": "Create Request Type",
        "fullName": "Full Name",
        "phone": "Phone Number",
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
        "unassigned": "Unassigned",
        "studentNo": "Student Number",
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
        "phone": "Phone Number",
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
        "phone": "Phone Number"
      },
      "delete": "Delete",
      "confirmDeleteTitle": "Are you sure you want to delete this?",
      "confirmDeleteMessage": "This action cannot be undone.",
      "cancel": "Cancel",
      "confirm": "Confirm"
    }
  },
  ar: {
    translation: {
      instructions: "تعليمات الطالب: سيتم معالجة طلبك في غضون 24 ساعة بعد إرسال طلبك.  ويرجى مراجعة الكلية ",
      welcome: "مرحباً بك في بوابة الطالب",
      student: "طالب",
      student_description: "أرسل طلباتك وتابع تقدمها",
      continue_as_student: "المتابعة كطالب",
      employee: "موظف",
      employee_description: "الوصول إلى لوحة الإدارة",
      employee_login: "تسجيل دخول الموظف",
      "Student Request Form": "استمارة طلب الطالب",
      "Full Name": "الاسم الكامل",
      "John Doe": "ادخل اسمك الرباعي",
      "Phone": "رقم الهاتف",
      "712345678": "رقم الهاتف",
      "Title": "العنوان",
      "Request Title": "عنوان الطلب",
      "Department": "الجهة",
      "Request Type": "نوع الطلب",
      "Select department": "اختر الجهة",
      "Select request type": "اختر نوع الطلب",
      "Message": "الرسالة",
      "Type your message here": "اكتب رسالتك هنا",
      "Upload Files (PDFs & Images)": "رفع الملفات (PDF والصور)",
      "Submitting...": "جاري الإرسال...",
      "Submit Request": "إرسال الطلب",
      "Request Submitted": "تم تقديم الطلب",
      "Your request was submitted successfully! Your request number is:": "تم تقديم طلبك بنجاح! رقم طلبك هو:",
      "Close": "إغلاق",
      "Department is required": "القسم مطلوب",
      "Request Type is required": "نوع  الطلب مطلوب",
      "Full Name is required": "الاسم الكامل مطلوب",
      "Title is required": "العنوان مطلوب",
      "Message is required": "الرسالة مطلوبة",
      "employeeLogin": "تسجيل دخول الموظف",
      "studentLogin": "تسجيل دخول الطالب",
      "phone": "رقم الهاتف",
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
        "departments": "الجهات",
        "userManagement": "إدارة المستخدمين",
        "studentRequests": "طلبات الطلاب",
        "requestTypes": "نوع الطلبات",
        studentUserManagement: "إدارة حسابات الطلاب"
      },
      'Search departments...': 'ابحث عن الأقسام...',
      'Search requests types...': 'ابحث عن أنواع الطلبات...',
      'Create Department': 'أنشئ قسم',
      'Create Request Type': 'أنشئ نوع طلب',
      'Edit Department': 'عدل القسم',
      'Edit Request Type': 'عدل نوع الطلب',
      'Create New Department': 'أنشئ قسم جديد',
      'Create New Request Type': 'أنشئ نوع طلب جديد',
      'Modify department details': 'قم بتغيير تفاصيل القسم',
      'Modify request type details': 'قم بتغيير تفاصيل نوع الطلب',
      'Add a new department to the system': 'أضف قسم جديد إلى النظام',
      'Add a new request type to the system': 'أضف نوع طلب جديد إلى النظام',
      'Department updated!': 'تم تحديث القسم!',
      'Department created!': 'تم إنشاء القسم!',
      'Request Type updated!': 'تم تحديث نوع الطلب!',
      'Request Type created!': 'تم إنشاء نوع الطلب!',
      'Department Name': 'اسم القسم',
      'Request Type Name': 'اسم نوع الطلب',
      'Total Requests': 'إجمالي الطلبات',
      'Actions': 'الإجراءات',
      'Edit': 'تعديل',
      'Delete': 'حذف',
      'Previous': 'السابق',
      'Next': 'التالي',
      'Page {{page}}': 'الصفحة {{page}}',
      'No departments found': 'لم يتم العثور على أقسام',
      'No request types found': 'لم يتم العثور على أنواع الطلبات',
      "form": {
        "departmentName": "اسم القسم",
        "requestTypeName": "اسم نوع الطلب",
        "saveChanges": "حفظ التغييرات",
        "createDepartment": "إنشاء قسم",
        "createRequestType": "إنشاء نوع طلب",
        "fullName": "الاسم الكامل",
        "phone": "رقم الهاتف",
        "password": "كلمة المرور",
        "department": "الجهة",
        "selectDepartment": "اختر الجهة",
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
        "unassigned": "غير معين",
        "studentNo": "رقم الطالب",
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
        "phone": "رقم الهاتف",
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
        "phone": "رقم الهاتف"
      },
      "delete": "حذف",
      "confirmDeleteTitle": "هل أنت متأكد أنك تريد حذف هذا؟",
      "confirmDeleteMessage": "هذه الإجراءات لا يمكن التراجع عنها.",
      "cancel": "إلغاء",
      "confirm": "تأكيد"
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
