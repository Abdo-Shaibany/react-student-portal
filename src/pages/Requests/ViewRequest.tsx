/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
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
import { useTranslation } from "react-i18next"
import { RequestStatus, statusColors } from "@/core/enum/requestStatus"
import { fetchRequestById, updateRequestStatus } from "@/core/services/requestService"
import { Request } from "@/core/models/Request.interface"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate } from "react-router-dom"
import { isStudent } from "@/core/services/loginService"
import { User } from "@/core/models/User.interface"
import { fetchUsers } from "@/core/services/usersService"
import { createRequestMovement } from "@/core/services/requestMovementService"

export function RequestViewPage() {


  const { t } = useTranslation();

  const naviagte = useNavigate();

  const [request, setRequest] = useState<Request | undefined>();
  
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(0);

  const studentUser = isStudent();

  const [employees, setEmployees] = useState<User[]>(
    []
  );


  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);
  const [newAssigneeId, setNewAssigneeId] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    const url = window.location.href;
    const id = url.split('/').pop();

    const fetchRequest = async () => {
      try {
        setLoading(true);
        const response = await fetchRequestById(id!);
        setRequest(response);

        if (!response) {
          toast.error(t("error.noRequestFound"));
          naviagte('/admin-portal/requests');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [t, naviagte, updateStatus]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const emps = await fetchUsers();
        setEmployees(emps);
      } catch (error: any) {
        toast.error(
          error.message || "Error fetching employees for reassignment"
        );
      }
    };
    loadEmployees();
  }, []);


  const handleStatusChange = async () => {
    setLoading(true)

    try {
      await updateRequestStatus(request!.id, newStatus as RequestStatus, comment)
      setUpdateStatus(updateStatus + 1);
      setIsDialogOpen(false)
      setNewStatus('')
      setComment('')
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  }

  const handleReassign = async () => {
    if (!request) return;
    if (!newAssigneeId) {
      toast.error(t("error.selectEmployee"));
      return;
    }
    setLoading(true);
    try {
      await createRequestMovement(request.id, newAssigneeId);
      toast.success(t("toast.reassignedSuccessfully"));

      setIsReassignDialogOpen(false);
      setNewAssigneeId("");
    } catch (error: any) {
      toast.error(error.message || "Failed to reassign");
    } finally {
      setLoading(false);
    }
  };

    if (loading) {
      return (
        <div className="p-6 space-y-4">
          <Skeleton className="h-10 w-[300px]" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      )
    }

    if(!request){
      return <>No request is found</>;
    }

    return (
      <div className="p-6 space-y-6">
        {/* Status Change Dialog */}
        <div className="flex items-center gap-2 justify-start">
          {!studentUser  && <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="ml-auto">{t("button.changeStatus")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("dialog.updateRequestStatus")}</DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                {t("dialog.addStatusDescription")}
              </DialogDescription>
              <div className="space-y-4">
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select.newStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">{t("status.pending")}</SelectItem>
                    <SelectItem value="inProgress">{t("status.inProgress")}</SelectItem>
                    <SelectItem value="completed">{t("status.completed")}</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder={t("placeholder.addComment")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  className="w-full"
                  onClick={handleStatusChange}
                  disabled={!newStatus}
                >
                  {t("button.updateStatus")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>}

          <span
            className={`px-2 mx-2 py-1 rounded-full text-sm ${statusColors[request.status]}`}
          >
            {t(`status.${request.status}`)}
          </span>
        </div>

        {/* Reassign Button */}
        {!studentUser && (
          <Dialog
            open={isReassignDialogOpen}
            onOpenChange={setIsReassignDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">{t("button.moveToNewEmployee")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("dialog.reassignRequest")}</DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                {t("dialog.reassignDescription")}
              </DialogDescription>
              <div className="space-y-4">
                <Select
                  value={newAssigneeId}
                  onValueChange={setNewAssigneeId}
                  disabled={employees.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("select.chooseEmployee")} />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id!}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="w-full"
                  onClick={handleReassign}
                  disabled={!newAssigneeId}
                >
                  {t("button.confirmReassign")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Accordions Section */}
        <Accordion
          type="multiple"
          defaultValue={[
            "student-info",
            "title",
            "message",
            "files",
            "status-history",
          ]}
        >
          {/* Student Info */}
          <AccordionItem value="student-info">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {t("accordion.studentInformation")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("label.name")}</p>
                  <p>{request.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("label.phone")}</p>
                  <p>{request.phone}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Title */}
          <AccordionItem value="title">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {t("accordion.requestTitle")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <p>{request.RequestType?.name}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Message */}
          <AccordionItem value="message">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span className="font-medium">{t("accordion.message")}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <p className="whitespace-pre-wrap">{request.message}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Files */}
          <AccordionItem value="files">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {t("accordion.attachedFiles", { count: request.files.length })}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {request.files.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    download
                    target="_blank"
                    className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    {file.type === "pdf" ? (
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
                <span className="font-medium">{t("accordion.statusHistory")}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="space-y-4">
                {request.statusHistory.map((history, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full ${statusColors[history.status]}`} />
                      {index < request.statusHistory.length - 1 && (
                        <div className="w-px h-full bg-border" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[history.status]}`}>
                          {t(`status.${history.status}`)}
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

          <AccordionItem value="movements">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <span className="font-medium">{t("accordion.movements")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="space-y-4">
              {/* If your backend returns `request.RequestMovement` as an array */}
              {Array.isArray(request.RequestMovement) && request.RequestMovement.length > 0 ? (
                request.RequestMovement
                  // optionally sort by date descending:
                  .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((mov: any, idx: number) => (
                    <div key={mov.id || idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {/* A dot */}
                        <div className="h-3 w-3 rounded-full bg-gray-500" />
                        {idx < request.RequestMovement.length - 1 && (
                          <div className="w-px h-full bg-border" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {mov.assignedTo
                              ? mov.assignedTo.name
                              : t("label.unassigned")}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(mov.date).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("text.noMovements")}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        </Accordion>
      </div>
    )
  }
