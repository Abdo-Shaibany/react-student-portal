import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function StudentFormPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g. using react-hook-form or your preferred method)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Student Request Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="block mb-1">
              Full Name
            </Label>
            <Input id="fullName" name="fullName" placeholder="John Doe" />
          </div>

          <div>
            <Label htmlFor="phone" className="block mb-1">
              Phone
            </Label>
            <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" />
          </div>

          <div>
            <Label htmlFor="title" className="block mb-1">
              Title
            </Label>
            <Input id="title" name="title" placeholder="Your request title" />
          </div>

          <div>
            <Label htmlFor="department" className="block mb-1">
              Department
            </Label>
            <Input id="department" name="department" placeholder="Department" />
          </div>

          <div>
            <Label htmlFor="message" className="block mb-1">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="fileUpload" className="block mb-1">
              Upload Files (PDFs & Images)
            </Label>
            <Input
              id="fileUpload"
              name="fileUpload"
              type="file"
              accept=".pdf,image/*"
              multiple
            />
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg">
              Submit Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default StudentFormPage;
