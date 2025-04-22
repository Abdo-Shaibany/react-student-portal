import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RequestTypeForm as FormData } from "@/core/models/RequestType.interface"
import { useTranslation } from "react-i18next";
import { useForm, } from "react-hook-form";
import { RequestType } from "@/core/models/RequestType.interface";
import { useEffect, useState } from "react";
import { Department } from "@/core/models/Department.interface";
import { fetchDepartments } from "@/core/services/departmentService";

export function RequestTypeForm({
  requestType,
  onSubmit,
}: {
  requestType?: RequestType | null
  onSubmit: (values: FormData) => void
}) {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchAndSetDepartments = async () => {
      const values = await fetchDepartments();
      setDepartments(values);
    };
    fetchAndSetDepartments();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const { t } = useTranslation();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="name">{t("form.requestTypeName")}</Label>
        <Input
          defaultValue={requestType?.name}
          id="name"
          {...register("name", { required: t('Name is required') })}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-600 text-sm">{t("validation.nameRequired")}</p>}
      </div>
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

      <Button type="submit" disabled={!isValid}
        className={!isValid ? "opacity-50 cursor-not-allowed w-full" : "w-full"}>
        {requestType ? t("form.saveChanges") : t("form.createRequestType")}
      </Button>
    </form>
  )
}