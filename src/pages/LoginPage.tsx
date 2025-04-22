import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { YemenPhoneValidations } from "@/core/validations/phone.validatation";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "@/core/models/LoginForm.interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitLoginRequest } from "@/core/services/loginService";

export function EmployeeLoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
        try {
          await submitLoginRequest(data);
          setLoading(false);
          navigate("/admin-portal/dashboard");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setLoading(false);
          setErrorMessage(error.message || "An error occurred while submitting your request");
        }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {t("employeeLogin")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="block mb-1">
              {t("phone")}
            </Label>
            <Input
              id="phone"
              placeholder={t("phone")}
              {...register("phone", YemenPhoneValidations)}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {t(errors.phone.message ?? '')}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="block mb-1">
              {t("password")}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              {...register("password", { required: t("passwordRequired") })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
          
          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
            >
              {loading ? t("submitting") : t("login")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EmployeeLoginPage;
