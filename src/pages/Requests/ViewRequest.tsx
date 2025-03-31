import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, FileText, ImageIcon } from "lucide-react"
import { requestsList } from "@/api/mock/requests"

export function RequestViewPage() {
    const url = window.location.href;
    const id = url.split('/').pop();
    const request = requestsList.find(request => request.id === id)!;


    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [comment, setComment] = useState('')
    const [localRequest, setLocalRequest] = useState(request)

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800'
    }

    const handleStatusChange = () => {
        const newHistory = [...localRequest.statusHistory, {
            status: newStatus as typeof request.statusHistory[0]['status'],
            date: new Date().toISOString(),
            comment
        }]

        setLocalRequest(prev => ({
            ...prev,
            statusHistory: newHistory
        }))
        setIsDialogOpen(false)
        setNewStatus('')
        setComment('')
    }

    return (
        <div className="p-6 space-y-6">

            {/* Status Change Dialog */}
            <div className="flex items-center gap-2 justify-start">

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="ml-auto">Change Status</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Request Status</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="sr-only">
                            {"Add a new status to the request"}
                        </DialogDescription>
                        <div className="space-y-4">
                            <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">On Progress</SelectItem>
                                    <SelectItem value="completed">Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <Textarea
                                placeholder="Add comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                                className="w-full"
                                onClick={handleStatusChange}
                                disabled={!newStatus}
                            >
                                Update Status
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <span className={`px-2 mx-2 py-1 rounded-full text-sm ${statusColors[request.status]}`}>
                    {request.status}
                </span>
            </div>

            {/* Accordions Section */}
            <Accordion type="multiple" defaultValue={['student-info', 'title', 'message', 'files', 'status-history']}>
                {/* Student Info */}
                <AccordionItem value="student-info">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Student Information</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p>{localRequest.studentName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p>{localRequest.phone}</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Title */}
                <AccordionItem value="title">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Request Title</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        <p>{localRequest.title}</p>
                    </AccordionContent>
                </AccordionItem>

                {/* Message */}
                <AccordionItem value="message">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Message</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        <p className="whitespace-pre-wrap">{localRequest.message}</p>
                    </AccordionContent>
                </AccordionItem>

                {/* Files */}
                <AccordionItem value="files">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Attached Files ({localRequest.files.length})</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {localRequest.files.map((file, index) => (
                                <a key={index} href={file.url}
                                    download className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                                    {file.type === 'pdf' ? (
                                        <FileText className="h-5 w-5 text-red-600" />
                                    ) : (
                                        <ImageIcon className="h-5 w-5 text-blue-600" />
                                    )}
                                    <span className="text-sm truncate">{file.name}</span>
                                    <Download className="h-5 w-5 text-gray-600 ms-auto" />
                                </a>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Status History */}
                <AccordionItem value="status-history">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Status History</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                        <div className="space-y-4">
                            {localRequest.statusHistory.map((history, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`h-3 w-3 rounded-full ${statusColors[history.status]}`} />
                                        {index < localRequest.statusHistory.length - 1 && (
                                            <div className="w-px h-full bg-border" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-sm ${statusColors[history.status]}`}>
                                                {history.status}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(history.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {history.comment && (
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {history.comment}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}