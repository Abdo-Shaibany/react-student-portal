/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { StudentUser, StudentUserFormData } from "@/core/models/User.interface";
import { StudentUserForm } from "./StudentUserForm";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ConfirmationModal from '@/components/confirm-deletion';
import { fetchStudnetUsers, deleteStudentUser, updateStudentUser, createStudentUser } from "@/core/services/studentUsersService";
import * as XLSX from "xlsx";


export function StudnetUsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<StudentUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<StudentUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // IMPORT-EXCEL: state for import dialog
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  // IMPORT-EXCEL: steps: "upload" -> "sheet" -> "mapping" -> "preview"
  type ImportStep = "upload" | "sheet" | "mapping" | "preview";
  const [importStep, setImportStep] = useState<ImportStep>("upload");

  // IMPORT-EXCEL: store the selected File, workbook, sheet names
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheetName, setSelectedSheetName] = useState<string>("");

  // IMPORT-EXCEL: headers (column names) extracted from first row of sheet
  const [headers, setHeaders] = useState<string[]>([]);

  // IMPORT-EXCEL: mapping from our fields to header column
  const [mapping, setMapping] = useState<{
    nameCol?: string;
    studentNoCol?: string;
    phoneCol?: string;
  }>({});

  // IMPORT-EXCEL: parsed rows as array of objects keyed by header
  const [parsedRows, setParsedRows] = useState<Record<string, any>[]>([]);
  
  // IMPORT-EXCEL: preview a subset
  const previewCount = 5;

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const filtered = await fetchStudnetUsers(searchQuery, sortOrder);
        setUsers(filtered);
      } catch (error: any) {
        toast.error(error.message || t("error.fetchUsers"));
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [searchQuery, sortOrder, t]);

  const handleSubmit = async (values: StudentUserFormData) => {
    setLoading(true);
    try {
      if (isEditMode && selectedUser) {
        await updateStudentUser(values.id!, values);
        toast.success(t("success.userUpdated"));
      } else {
        await createStudentUser(values);
        toast.success(t("success.userCreated"));
      }
      const filtered = await fetchStudnetUsers(searchQuery, sortOrder);
      setUsers(filtered);
    } catch (error: any) {
      toast.error(error.message || t("error.submitUser"));
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  // Handle delete
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteStudentUser(selectedUserId!);
      toast.success(t("success.userDeleted"));
      const filtered = await fetchStudnetUsers(searchQuery, sortOrder);
      setUsers(filtered);
    } catch (error: any) {
      toast.error(error.message || t("error.deleteUser"));
    } finally {
      setLoading(false);
    }
  };

  // When file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setExcelFile(file);
      setImportStep("sheet");
      setSelectedSheetName("");
      setSheetNames([]);
      setHeaders([]);
      setParsedRows([]);
      setMapping({});
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target?.result;
        if (!data) return;
        // Read as array buffer
        const wb = XLSX.read(data, { type: "array" });
        setSheetNames(wb.SheetNames);
        // we wait for user to select sheet
      };
      reader.onerror = () => {
        toast.error(t("error.importFailed"));
      };
      reader.readAsArrayBuffer(file);
    }
  };

    // When sheet is selected
  const handleSheetSelect = () => {
    if (!excelFile || !selectedSheetName) {
      toast.error(t("error.noSheetSelected"));
      return;
    }
    setImportStep("mapping");
    // Parse the selected sheet to extract headers and rows
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) return;
      const wb = XLSX.read(data, { type: "array" });
      const ws = wb.Sheets[selectedSheetName];
      if (!ws) {
        toast.error(t("error.noSheetSelected"));
        return;
      }
      // Use sheet_to_json with header: 1 to get array of arrays
      const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (rows.length === 0) {
        toast.error(t("text.noHeadersFound"));
        setHeaders([]);
        setParsedRows([]);
        return;
      }
      // First row as headers (strings)
      const headerRow = rows[0].map((h: any) => String(h).trim());
      setHeaders(headerRow);
      // Build array of row objects for rows after header
      const dataRows = rows.slice(1).map((row) => {
        const obj: Record<string, any> = {};
        headerRow.forEach((colName, idx) => {
          obj[colName] = row[idx];
        });
        return obj;
      });
      setParsedRows(dataRows);
    };
    reader.onerror = () => {
      toast.error(t("error.importFailed"));
    };
    reader.readAsArrayBuffer(excelFile);
  };

  // When mapping changes
  const handleMappingChange = (
    field: "nameCol" | "studentNoCol" | "phoneCol",
    colName: string
  ) => {
    setMapping((m) => ({
      ...m,
      [field]: colName,
    }));
  };

  const handleMappingNext = () => {
    if (!mapping.nameCol || !mapping.studentNoCol || !mapping.phoneCol) {
      toast.error(t("error.mappingIncomplete"));
      return;
    }

    setImportStep("preview");
  };

  const handleBack = () => {
    if (importStep === "sheet") {
      setImportStep("upload");
      setExcelFile(null);
      setSheetNames([]);
    } else if (importStep === "mapping") {
      setImportStep("sheet");
      setSelectedSheetName("");
      setHeaders([]);
      setParsedRows([]);
    } else if (importStep === "preview") {
      setImportStep("mapping");
    }
  };

  // Confirm import: iterate parsedRows, build user data, call createStudentUser
  const handleConfirmImport = async () => {
    if (!parsedRows.length) {
      toast.error(t("error.importFailed"));
      return;
    }
    setLoading(true);
    toast.info(t("toast.importStarted"));
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < parsedRows.length; i++) {
      const row = parsedRows[i];
      const nameVal = row[mapping.nameCol!];
      const studentNoVal = row[mapping.studentNoCol!];
      const phoneVal = row[mapping.phoneCol!];

      if (
        typeof nameVal === "undefined" ||
        typeof studentNoVal === "undefined" ||
        typeof phoneVal === "undefined"
      ) {
        failCount++;
        continue;
      }

      const userData: StudentUserFormData = {
        name: String(nameVal).trim(),
        phone: String(phoneVal).trim(),
        studentNo: String(studentNoVal).trim(),
        password: String(studentNoVal).trim(), // as requested
      };
      try {
        await createStudentUser(userData);
        successCount++;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        failCount++;
      }
    }
    setLoading(false);
    toast.success(
      t("toast.importCompleted", { successCount, failCount })
    );
    // Close dialog and refresh users
    setIsImportDialogOpen(false);
    setImportStep("upload");
    setExcelFile(null);
    setSheetNames([]);
    setSelectedSheetName("");
    setHeaders([]);
    setParsedRows([]);
    setMapping({});
    // Refresh list
    try {
      setLoading(true);
      const filtered = await fetchStudnetUsers(searchQuery, sortOrder);
      setUsers(filtered);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header with Search and Create Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          placeholder={t("form.searchUsers")}
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
     <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedUser(null);
                }}
              >
                {t("form.createUser")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? t("form.editUser") : t("form.createNewUser")}
                </DialogTitle>
              </DialogHeader>
              <StudentUserForm
                user={selectedUser}
                onSubmit={handleSubmit}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isImportDialogOpen}
            onOpenChange={(open) => {
              setIsImportDialogOpen(open);
              if (!open) {
                // reset when closed
                setImportStep("upload");
                setExcelFile(null);
                setSheetNames([]);
                setSelectedSheetName("");
                setHeaders([]);
                setParsedRows([]);
                setMapping({});
              }
            }}
            modal
          >
            <DialogTrigger asChild>
              <Button variant="outline">{t("button.importExcel")}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{t("dialog.importExcelTitle")}</DialogTitle>
              </DialogHeader>

              {/* IMPORT-EXCEL: Step UI */}
              <div className="space-y-4">
                {importStep === "upload" && (
                  <div className="space-y-2">
                    <p>{t("dialog.importExcelTitle")}</p>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                      className="mt-2"
                    />
                  </div>
                )}

                {importStep === "sheet" && (
                  <div className="space-y-2">
                    <p>{t("dialog.selectSheet")}</p>
                    <select
                      value={selectedSheetName}
                      onChange={(e) => setSelectedSheetName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">{t("select.chooseSheet")}</option>
                      {sheetNames.map((sheet) => (
                        <option key={sheet} value={sheet}>
                          {sheet}
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={handleBack}>
                        {t("button.back")}
                      </Button>
                      <Button
                        onClick={handleSheetSelect}
                        disabled={!selectedSheetName}
                      >
                        {t("button.next")}
                      </Button>
                    </div>
                  </div>
                )}

                {importStep === "mapping" && (
                  <div className="space-y-4">
                    <p>{t("dialog.selectMapping")}</p>
                    {/* Map Name */}
                    <div>
                      <label className="block text-sm">
                        {t("select.mapName")}
                      </label>
                      <select
                        value={mapping.nameCol || ""}
                        onChange={(e) =>
                          handleMappingChange("nameCol", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">{t("select.mapName")}</option>
                        {headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Map StudentNo */}
                    <div>
                      <label className="block text-sm">
                        {t("select.mapStudentNo")}
                      </label>
                      <select
                        value={mapping.studentNoCol || ""}
                        onChange={(e) =>
                          handleMappingChange("studentNoCol", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">{t("select.mapStudentNo")}</option>
                        {headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Map Phone */}
                    <div>
                      <label className="block text-sm">
                        {t("select.mapPhone")}
                      </label>
                      <select
                        value={mapping.phoneCol || ""}
                        onChange={(e) =>
                          handleMappingChange("phoneCol", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option value="">{t("select.mapPhone")}</option>
                        {headers.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={handleBack}>
                        {t("button.back")}
                      </Button>
                      <Button
                        onClick={handleMappingNext}
                        disabled={
                          !mapping.nameCol ||
                          !mapping.studentNoCol ||
                          !mapping.phoneCol
                        }
                      >
                        {t("button.next")}
                      </Button>
                    </div>
                  </div>
                )}

                {importStep === "preview" && (
                  <div className="space-y-4">
                    <p>{t("dialog.previewData")}</p>
                    <div className="overflow-auto max-h-64 border rounded p-2">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr>
                            <th className="px-2 py-1 text-left">
                              {mapping.nameCol}
                            </th>
                            <th className="px-2 py-1 text-left">
                              {mapping.studentNoCol}
                            </th>
                            <th className="px-2 py-1 text-left">
                              {mapping.phoneCol}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsedRows.slice(0, previewCount).map((row, idx) => (
                            <tr key={idx} className="even:bg-gray-50">
                              <td className="px-2 py-1">
                                {String(row[mapping.nameCol!] ?? "")}
                              </td>
                              <td className="px-2 py-1">
                                {String(row[mapping.studentNoCol!] ?? "")}
                              </td>
                              <td className="px-2 py-1">
                                {String(row[mapping.phoneCol!] ?? "")}
                              </td>
                            </tr>
                          ))}
                          {parsedRows.length === 0 && (
                            <tr>
                              <td
                                colSpan={3}
                                className="px-2 py-1 text-center text-sm text-muted-foreground"
                              >
                                {t("text.noHeadersFound")}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={handleBack}>
                        {t("button.back")}
                      </Button>
                      <Button
                        onClick={handleConfirmImport}
                        disabled={parsedRows.length === 0}
                      >
                        {t("button.confirmImport")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="text-center py-8">{t("loading")}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("form.name")}</TableHead>
              <TableHead>{t("form.phone")}</TableHead>
              <TableHead>{t("form.studentNo")}</TableHead>
              <TableHead>{t("form.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.studentNo}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditMode(true);
                          setSelectedUser(user);
                          setIsDialogOpen(true);
                        }}
                      >
                        {t("form.edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteClick(user.id!)}
                      >
                        {t("form.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          {t("form.noUsersFound")}
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default StudnetUsersPage;
