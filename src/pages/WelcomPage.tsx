import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-12">
          Welcome to Student Portal
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold">Student</h2>
              <p className="text-gray-600 text-center">
                Submit your requests and track their progress
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/student-form')}
                >
                Continue as Student
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold">Employee</h2>
              <p className="text-gray-600 text-center">
                Access the management dashboard
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/employee-login')}
              >
                Employee Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}