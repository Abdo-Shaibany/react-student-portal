import { Request } from "@/core/models/Request.interface";

export const requestsList: Request[] = [
    {
        id: "1",
        requestNumber: "REQ-001",
        studentName: "John Doe",
        title: "Document Verification",
        phone: "+123456789",
        email: "john@uni.edu",
        message: "I need to get my documents verified",
        createdAt: "2024-03-01T00:00:00.000Z",
        status: "pending",
        departmentId: "1",
        assignedToId: "1",
        department: { id: "1", name: "Admissions", totalRequests: 24 },
        assignedTo: { id: "1", name: "John Doe", email: "john@uni.edu", departmentId: "1", totalRequests: 24 },
        files: [
            {
                name: "document.pdf",
                type: "pdf",
                url: "https://example.com/document.pdf",
            },
            {
                name: "image.jpg",
                type: "image",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
            },
        ],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-01T00:00:00.000Z",
                comment: ""
            }
        ]
    },
    {
        id: "2",
        requestNumber: "REQ-002",
        studentName: "Jane Smith",
        title: "Financial Aid",
        phone: "+987654321",
        email: "jane@uni.edu",
        message: "I need to get my financial aid processed",
        createdAt: "2024-03-02T00:00:00.000Z",
        status: "in-progress",
        departmentId: "2",
        assignedToId: "2",
        department: { id: "2", name: "Registrar", totalRequests: 42 },
        assignedTo: { id: "2", name: "Jane Smith", email: "jane@uni.edu", departmentId: "2", totalRequests: 42 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-02T00:00:00.000Z",
                comment: ""
            },
            {
                status: "in-progress",
                date: "2024-03-03T00:00:00.000Z",
                comment: ""
            }
        ]
    },
    {
        id: "3",
        requestNumber: "REQ-003",
        studentName: "Bob Johnson",
        title: "Admissions Application",
        phone: "+123456789",
        email: "bob@uni.edu",
        message: "I need to get my application processed",
        createdAt: "2024-03-04T00:00:00.000Z",
        status: "completed",
        departmentId: "1",
        assignedToId: "1",
        department: { id: "1", name: "Admissions", totalRequests: 24 },
        assignedTo: { id: "1", name: "John Doe", email: "john@uni.edu", departmentId: "1", totalRequests: 24 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-04T00:00:00.000Z",
                comment: ""
            },
            {
                status: "in-progress",
                date: "2024-03-05T00:00:00.000Z",
                comment: ""
            },
            {
                status: "completed",
                date: "2024-03-06T00:00:00.000Z",
                comment: ""
            }
        ]
    },
    {
        id: "4",
        requestNumber: "REQ-004",
        studentName: "Alice Brown",
        title: "Library Card",
        phone: "+987654321",
        email: "alice@uni.edu",
        message: "I need to get my library card issued",
        createdAt: "2024-03-07T00:00:00.000Z",
        status: "pending",
        departmentId: "3",
        assignedToId: "3",
        department: { id: "3", name: "Library", totalRequests: 15 },
        assignedTo: { id: "3", name: "Alice Brown", email: "alice@uni.edu", departmentId: "3", totalRequests: 15 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-07T00:00:00.000Z",
                comment: ""
            },
            {
                status: "in-progress",
                date: "2024-03-08T00:00:00.000Z",
                comment: ""
            },
        ]
    },
    {
        id: "5",
        requestNumber: "REQ-005",
        studentName: "David Lee",
        title: "Dorm Room Assignment",
        phone: "+123456789",
        email: "david@uni.edu",
        message: "I need to get my dorm room assigned",
        createdAt: "2024-03-10T00:00:00.000Z",
        status: "pending",
        departmentId: "4",
        assignedToId: "4",
        department: { id: "4", name: "Housing", totalRequests: 10 },
        assignedTo: { id: "4", name: "David Lee", email: "david@uni.edu", departmentId: "4", totalRequests: 10 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-10T00:00:00.000Z",
                comment: ""
            }
        ]
    },
    {
        id: "6",
        requestNumber: "REQ-006",
        studentName: "Emily Davis",
        title: "Student ID",
        phone: "+987654321",
        email: "emily@uni.edu",
        message: "I need to get my student ID issued",
        createdAt: "2024-03-11T00:00:00.000Z",
        status: "in-progress",
        departmentId: "5",
        assignedToId: "5",
        department: { id: "5", name: "Student Affairs", totalRequests: 20 },
        assignedTo: { id: "5", name: "Emily Davis", email: "emily@uni.edu", departmentId: "5", totalRequests: 20 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-11T00:00:00.000Z",
                comment: ""
            },
            {
                status: "in-progress",
                date: "2024-03-12T00:00:00.000Z",
                comment: ""
            }
        ]
    },
    {
        id: "7",
        requestNumber: "REQ-007",
        studentName: "Sarah Taylor",
        title: "Transcript",
        phone: "+123456789",
        email: "sarah@uni.edu",
        message: "I need to get my transcript issued",
        createdAt: "2024-03-13T00:00:00.000Z",
        status: "completed",
        departmentId: "6",
        assignedToId: "6",
        department: { id: "6", name: "Registrar", totalRequests: 42 },
        assignedTo: { id: "6", name: "Sarah Taylor", email: "sarah@uni.edu", departmentId: "6", totalRequests: 42 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-13T00:00:00.000Z",
                comment: ""
            },
            {
                status: "in-progress",
                date: "2024-03-14T00:00:00.000Z",
                comment: ""
            },
            {
                status: "completed",
                date: "2024-03-15T00:00:00.000Z",
                comment: ""
            }
        ]
    },
    {
        id: "8",
        requestNumber: "REQ-008",
        studentName: "Michael White",
        title: "Dropping Course",
        phone: "+987654321",
        email: "michael@uni.edu",
        message: "I need to drop my course",
        createdAt: "2024-03-16T00:00:00.000Z",
        status: "pending",
        departmentId: "7",
        assignedToId: "7",
        department: { id: "7", name: "Academic Advising", totalRequests: 12 },
        assignedTo: { id: "7", name: "Michael White", email: "michael@uni.edu", departmentId: "7", totalRequests: 12 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-16T00:00:00.000Z",
                comment: ""
            },
            {
                status: "in-progress",
                date: "2024-03-17T00:00:00.000Z",
                comment: ""
            },
        ]
    },
    {
        id: "9",
        requestNumber: "REQ-009",
        studentName: "Jessica Martin",
        title: "Grading Appeal",
        phone: "+123456789",
        email: "jessica@uni.edu",
        message: "I need to appeal my grade",
        createdAt: "2024-03-19",
        status: "pending",
        departmentId: "8",
        assignedToId: "8",
        department: { id: "8", name: "Academic Affairs", totalRequests: 8 },
        assignedTo: { id: "8", name: "Jessica Martin", email: "jessica@uni.edu", departmentId: "8", totalRequests: 8 },
        files: [],
        statusHistory: [
            {
                status: "pending",
                date: "2024-03-19",
                comment: ""
            }
        ]
    },
]
