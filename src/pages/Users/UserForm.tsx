import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Department } from "@/core/models/Department.interface"
import { User, UserFormData } from "@/core/models/User.interface"
import { YemenPhoneValidations } from "@/core/validations/phone.validatation"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

export function UserForm({
    user,
    departments,
    onSubmit
  }: {
    user?: User | null
    departments: Department[]
    onSubmit: (values: UserFormData) => void
  }) {
    const { t } = useTranslation();

    const {
      control,
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<UserFormData>({
      mode: "onChange",
      defaultValues: {
        name: user?.name || "",
        phone: user?.phone || "",
        password: "",
        departmentId: user?.department?.id || "",
      },
    });


    const submitHandler: SubmitHandler<UserFormData> = (data) => {
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

      <div className="space-y-2">
        <Label>{t("form.department")}</Label>
        <Controller
          name="departmentId"
          control={control}
          rules={{ required: t("validation.departmentRequired") }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectDepartment")} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id!}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.departmentId && <p className="text-red-600 text-sm">{errors.departmentId.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={!isValid}>
        {user ? t("form.saveChanges") : t("form.createUser")}
      </Button>
    </form>
    )
  }