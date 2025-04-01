import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToggleLanguage } from "@/components/toggle-language";

export function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Language Toggle Button */}
        <ToggleLanguage></ToggleLanguage>

        <h1 className="text-4xl font-bold text-center text-slate-800 mb-12">
          {t("welcome")}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold">{t("student")}</h2>
              <p className="text-gray-600 text-center">
                {t("student_description")}
              </p>
              <Button size="lg" onClick={() => navigate('/student-form')}>
                {t("continue_as_student")}
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold">{t("employee")}</h2>
              <p className="text-gray-600 text-center">
                {t("employee_description")}
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/employee-login')}
              >
                {t("employee_login")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
