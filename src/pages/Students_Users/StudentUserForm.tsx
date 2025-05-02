import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StudentUser, StudentUserFormData } from "@/core/models/User.interface"
import { YemenPhoneValidations } from "@/core/validations/phone.validatation"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

export function StudentUserForm({
  user,
  onSubmit
}: {
  user?: StudentUser | null
  onSubmit: (values: StudentUserFormData) => void
}) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StudentUserFormData>({
    mode: "onChange",
    defaultValues: {
      id: user?.id,
      name: user?.name || "",
      phone: user?.phone || "",
      password: "",
      studentNo: user?.studentNo || "",
    },
  });


  const submitHandler: SubmitHandler<StudentUserFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-2">
        <Label htmlFor="name">{t("form.fullName")}</Label>
        <Input
          id="name"
          {...register("name", { required: t("validation.nameRequired") })}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("form.phone")}</Label>
        <Input
          id="phone"
          {...register("phone", YemenPhoneValidations)}
        />
        {errors.phone && <p className="text-red-600 text-sm">{t(errors.phone.message ?? '')}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">{t("form.studentNo")}</Label>
        <Input
          id="studentNo"
          {...register("studentNo", { required: t("validation.studentNoRequired") })}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      {/* Show password field only when creating a new user */}
      {!user && (
        <div className="space-y-2">
          <Label htmlFor="password">{t("form.password")}</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: t("validation.passwordRequired") })}
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
      )}


      <Button type="submit" className="w-full" disabled={!isValid}>
        {user ? t("form.saveChanges") : t("form.createUser")}
      </Button>
    </form>
  )
}