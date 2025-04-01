import { useTranslation } from "react-i18next";
import { Button } from "./ui/button"

export function ToggleLanguage() {
    const { i18n } = useTranslation();


    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);

        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        localStorage.setItem("i18nextLng", newLang);
    };

    return (<div className="flex justify-end">
        <Button onClick={toggleLanguage}>
            {/* This could be replaced with an icon if desired */}
            {i18n.language === "en" ? "عربي" : "English"}
        </Button>
    </div>);

}