import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { KeyIcon } from "lucide-react"
import { ChangePasswordFormData } from "@/core/models/User.interface"


export function ChangePasswordForm({
  onSubmit,
}: {
  onSubmit: (values: ChangePasswordFormData) => void
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormData>({ mode: "onChange" })

  const newPasswordValue = watch("newPassword", "")

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-1">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          aria-invalid={!!errors.currentPassword}
        />
        {errors.currentPassword && (
          <p className="text-red-600 text-sm">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          aria-invalid={!!errors.newPassword}
        />
        {errors.newPassword && (
          <p className="text-red-600 text-sm">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input
          id="confirmNewPassword"
          type="password"
          {...register("confirmNewPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPasswordValue || "Passwords do not match",
          })}
          aria-invalid={!!errors.confirmNewPassword}
        />
        {errors.confirmNewPassword && (
          <p className="text-red-600 text-sm">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className={isValid ? "w-full" : "w-full opacity-50 cursor-not-allowed"}
      >
        Change Password
      </Button>
    </form>
  )
}

export function ChangePasswordModal({
  onSubmit,
}: {
  onSubmit: (values: ChangePasswordFormData) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <KeyIcon className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm
          onSubmit={(vals) => {
            onSubmit(vals)
            setOpen(false)
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
