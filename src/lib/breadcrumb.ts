export const getBreadcrumbItems = (pathname: string) => {
    const pathSegments = pathname
        .split('/')
        .filter(segment => segment !== '')

    const breadcrumbMap: Record<string, string> = {
        'admin-portal': 'Admin Portal',
        dashboard: 'Dashboard',
        departments: 'Departments',
        requestTypes: 'Request Types',
        'users': 'User Management',
        'requests': 'Student Requests',
        'students-users': 'Students Accounts',
    }

    const breadcrumbMapAr: Record<string, string> = {
        'admin-portal': 'الوحده الادارية',
        dashboard: 'لوحة التحكم',
        departments: 'الادارات',
        requestTypes: 'نوع الطلبات',
        'users': 'ادارة المستخدمين',
        'requests': 'طلبات الطلاب',
        'students-users': 'حسابات الطلاب',
    }

    return pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/')
        return {
            href,
            label: breadcrumbMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            labelAr: breadcrumbMapAr[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        }
    })
}