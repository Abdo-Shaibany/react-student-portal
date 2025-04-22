import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RequestTypeForm as FormData} from "@/core/models/RequestType.interface"
import { useTranslation } from "react-i18next";
import { useForm, } from "react-hook-form";
import { RequestType } from "@/core/models/RequestType.interface";

export function RequestTypeForm({
  requestType,
  onSubmit,
}: {
  requestType?: RequestType | null
  onSubmit: (values: FormData) => void
}) {

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
        <Label htmlFor="name">{t("form.departmentName")}</Label>
        <Input
          defaultValue={requestType?.name}
          id="name"
          {...register("name", { required: t('Name is required') })}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-600 text-sm">{t("validation.nameRequired")}</p>}
      </div>
      <Button type="submit" disabled={!isValid}
        className={!isValid ? "opacity-50 cursor-not-allowed w-full" : "w-full"}>
        {requestType ? t("form.saveChanges") : t("form.createDepartment")}
      </Button>
    </form>
  )
}