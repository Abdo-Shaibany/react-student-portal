import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { YemenPhoneValidations } from "@/core/validations/phone.validatation";
import { RequestForm } from "@/core/models/Request.interface";
import { departmentsList } from "@/api/mock/departments";


export function StudentFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RequestForm>({
    mode: "onChange",
  });

  const onSubmit = (data: RequestForm) => {
    console.log("Form submitted: ", data);
    // TODO: show loading
    // TODO: send the form data to the server
    // TODO: show dialog to the user with the request number
  };

  // fetch the departments from the server
  const departments = departmentsList;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Student Request Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="block mb-1">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="block mb-1">
              Phone
            </Label>
            <Input
              id="phone"
              placeholder="712345678"
              {...register("phone", YemenPhoneValidations)}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="block mb-1">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Request Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Department Dropdown */}
          <div>
            <Label htmlFor="departmentId" className="block mb-1">
              Department
            </Label>
            <select
              id="departmentId"
              className="border border-gray-300 rounded p-2 w-full"
              {...register("departmentId", { required: "Department is required" })}
            >
              <option value="">Select department</option>
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

          {/* Message */}
          <div>
            <Label htmlFor="message" className="block mb-1">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here"
              rows={4}
              {...register("message", { required: "Message is required" })}
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
              Upload Files (PDFs & Images)
            </Label>
            <Input
              id="fileUpload"
              type="file"
              accept=".pdf,image/*"
              multiple
              {...register("fileUpload", {
                required: "Please upload at least one file",
              })}
            />
            {errors.fileUpload && (
              <span className="text-red-500 text-sm">
                {errors.fileUpload.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default StudentFormPage;
