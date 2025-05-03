import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { YemenPhoneValidations } from "@/core/validations/phone.validatation";
import { RequestForm } from "@/core/models/Request.interface";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { fetchDepartments } from "@/core/services/departmentService";
import { Department } from "@/core/models/Department.interface";
import { submitStudentRequest } from "@/core/services/requestService";
import { fetchRequestTypes } from "@/core/services/requestTypesService";
import { RequestType } from "@/core/models/RequestType.interface";

export function StudentFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch, 
  } = useForm<RequestForm>({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [requestNumber, setRequestNumber] = useState<number | null>(null);
  const { t } = useTranslation();


  const onSubmit = async (data: RequestForm) => {
    setErrorMessage("");
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('fullName', data.fullName);
      // formData.append('phone', data.phone);
      formData.append('departmentId', data.departmentId);
      formData.append('requestTypeId', data.requestTypeId);
      formData.append('message', data.message);

      if (data.fileUpload && data.fileUpload.length > 0) {
        Array.from(data.fileUpload).forEach((file) => {
          formData.append("fileUpload", file);
        });
      }
      const response = await submitStudentRequest(formData);
      setLoading(false);
      setDialogOpen(true);
      setRequestNumber(response.requestNumber);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred while submitting your request");
    }
  };

  useEffect(() => {
    const fetchAndSetDepartments = async () => {
      const values = await fetchDepartments();
      setDepartments(values);

      const requestTypes = await fetchRequestTypes();
      setRequestTypes(requestTypes)
    };
    fetchAndSetDepartments();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">{t('Student Request Form')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          {/* <div>
            <Label htmlFor="fullName" className="block mb-1">
              {t('Full Name')}
            </Label>
            <Input
              id="fullName"
              placeholder={t('John Doe')}
              {...register("fullName", { required: t('Full Name is required') })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div> */}

          {/* Phone */}
          {/* <div>
            <Label htmlFor="phone" className="block mb-1">
              {t('Phone')}
            </Label>
            <Input
              id="phone"
              placeholder={t('712345678')}
              {...register("phone", YemenPhoneValidations)}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {t(errors.phone.message ?? '')}
              </span>
            )}
          </div> */}


          {/* Department Dropdown */}
          <div>
            <Label htmlFor="departmentId" className="block mb-1">
              {t('Department')}
            </Label>
            <select
              id="departmentId"
              className="border border-gray-300 rounded p-2 w-full"
              {...register("departmentId", { required: t('Department is required') })}
            >
              <option value="">{t('Select department')}</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <span className="text-red-500 text-sm">
                {errors.departmentId.message}
              </span>
            )}
          </div>

          {/* Request Type Dropdown */}
          <div>
            <Label htmlFor="requestTypeId" className="block mb-1">
              {t('Request Type')}
            </Label>
            <select
              id="requestTypeId"
              className="border border-gray-300 rounded p-2 w-full"
              {...register("requestTypeId", { required: t('Request Type is required') })}
            >
              <option value="">{t("Select request type")}</option>
              {requestTypes.filter((rt) => rt.departmentId === watch('departmentId')).map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <span className="text-red-500 text-sm">
                {errors.departmentId.message}
              </span>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="block mb-1">
              {t('Message')}
            </Label>
            <Textarea
              id="message"
              placeholder={t('Type your message here')}
              rows={4}
              {...register("message", { required: t('Message is required') })}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="fileUpload" className="block mb-1">
              {t('Upload Files (PDFs & Images)')}
            </Label>
            <Input
              id="fileUpload"
              type="file"
              accept=".pdf,image/*"
              multiple
              {...register("fileUpload")}
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">
              {errorMessage}
            </div>
          )}

          {t('instructions')}
          
          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
            >
              {loading ? t('Submitting...') : t('Submit Request')}
            </Button>
          </div>
        </form>
      </Card>

      {/* Shadcn UI Dialog for Success */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Request Submitted')}</DialogTitle>
            <DialogDescription>
              {t('Your request was submitted successfully! Your request number is:')}
              <strong>{requestNumber}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>{t('Close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentFormPage;
