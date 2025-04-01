export const getBreadcrumbItems = (pathname: string) => {
    const pathSegments = pathname
        .split('/')
        .filter(segment => segment !== '')

    const breadcrumbMap: Record<string, string> = {
        'admin-portal': 'Admin Portal',
        dashboard: 'Dashboard',
        departments: 'Departments',
        'user-management': 'User Management',
        'student-requests': 'Student Requests',
    }

    const breadcrumbMapAr: Record<string, string> = {
        'admin-portal': 'الوحده الادارية',
        dashboard: 'لوحة التحكم',
        departments: 'الادارات',
        'user-management': 'ادارة المستخدمين',
        'student-requests': 'طلبات الطلاب',
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